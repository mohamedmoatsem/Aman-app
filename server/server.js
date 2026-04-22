// server/server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import sql, { testConnection } from './db.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());

// --- إعداد Google Gemini مع Function Calling ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const tools = {
  functionDeclarations: [
    {
      name: "search_breathing_exercises",
      description: "البحث في قاعدة المعرفة عن تمارين تنفس مناسبة لحالة نفسية معينة.",
      parameters: {
        type: "OBJECT",
        properties: {
          condition: {
            type: "STRING",
            description: "الحالة النفسية للمستخدم (مثل: قلق، حزن، توتر، غضب)",
          },
        },
        required: ["condition"],
      },
    },
  ],
};

// النموذج الصحيح المتاح مجاناً ويدعم Function Calling
const model = genAI.getGenerativeModel({
  model: "models/gemma-4-26b-a4b-it",
  tools: tools,
});

// دالة البحث الوهمية (استبدلها بقاعدة بياناتك الحقيقية)
async function searchExercisesInDatabase(condition) {
  const exercisesDB = {
    "قلق": ["تمرين التنفس 4-7-8", "تمرين التأريض 5-4-3-2-1"],
    "حزن": ["تمرين كتابة المشاعر", "تمرين الامتنان"],
    "توتر": ["تمرين استرخاء العضلات التدريجي", "تمرين التنفس العميق"],
    "غضب": ["تمرين العد للعشرة", "تمرين التصور الإيجابي"]
  };
  return exercisesDB[condition] || ["تمرين تنفس عام"];
}

// دالة معالجة طلبات المساعد الذكي
async function handleAssistantRequest(userMessage) {
  try {
    const chat = model.startChat();
    const result = await chat.sendMessage(userMessage);
    const call = result.response;

    // التحقق مما إذا كان النموذج يطلب استدعاء دالة
    if (call.functionCalls() && call.functionCalls().length > 0) {
      const functionCall = call.functionCalls()[0];
      if (functionCall.name === "search_breathing_exercises") {
        const args = functionCall.args;
        const exercises = await searchExercisesInDatabase(args.condition);
        const functionResponse = {
          functionResponse: {
            name: "search_breathing_exercises",
            response: { exercises: exercises },
          },
        };
        const finalResult = await chat.sendMessage(functionResponse);
        return finalResult.response.text();
      }
    }
    return call.text();
  } catch (error) {
    console.error("خطأ في معالجة طلب المساعد الذكي:", error);
    return "عذرًا، حدث خطأ أثناء معالجة طلبك. تأكد من مفتاح API.";
  }
}

// نقطة نهاية API للمساعد الذكي
app.post('/api/assistant', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });
  const response = await handleAssistantRequest(message);
  res.json({ response });
});

// اختبار الاتصال بقاعدة البيانات
(async () => {
  await testConnection();
})();

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('👤 مستخدم متصل:', socket.id);

  socket.on('login', (userId) => {
    connectedUsers.set(socket.id, parseInt(userId));
    console.log(`🔑 المستخدم ${userId} سجل الدخول`);
  });

  socket.on('get conversations', async () => {
    const userId = connectedUsers.get(socket.id);
    if (!userId) return;

    try {
      const conversations = await sql`
        SELECT 
          c.id, c.user1_id, c.user2_id, c.type, c.is_anonymous, c.created_at,
          u1.username as user1_username, u1.role as user1_role,
          u2.username as user2_username, u2.role as user2_role,
          (SELECT message_text FROM messages WHERE conversation_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message,
          (SELECT timestamp FROM messages WHERE conversation_id = c.id ORDER BY timestamp DESC LIMIT 1) as last_message_time
        FROM conversations c
        JOIN users u1 ON c.user1_id = u1.id
        JOIN users u2 ON c.user2_id = u2.id
        WHERE c.user1_id = ${userId} OR c.user2_id = ${userId}
        ORDER BY last_message_time DESC NULLS LAST, c.created_at DESC
      `;

      const formatted = conversations.map(conv => {
        const isUser1 = conv.user1_id === userId;
        return {
          id: conv.id,
          user1_id: conv.user1_id,
          user2_id: conv.user2_id,
          type: conv.type,
          is_anonymous: conv.is_anonymous,
          created_at: conv.created_at,
          last_message: conv.last_message,
          last_message_time: conv.last_message_time,
          user1_details: {
            id: conv.user1_id,
            username: conv.is_anonymous && !isUser1 ? 'مستخدم مجهول' : conv.user1_username,
            role: conv.user1_role,
          },
          user2_details: {
            id: conv.user2_id,
            username: conv.is_anonymous && isUser1 ? 'مستخدم مجهول' : conv.user2_username,
            role: conv.user2_role,
          },
        };
      });

      socket.emit('conversations', formatted);
    } catch (error) {
      console.error('❌ خطأ في جلب المحادثات:', error);
      socket.emit('conversations', []);
    }
  });

  socket.on('get professionals', async () => {
    try {
      const professionals = await sql`
        SELECT id, username, role, specialty, available FROM users WHERE role = 'professional' ORDER BY username ASC
      `;
      socket.emit('professionals', professionals);
    } catch (error) {
      console.error('❌ خطأ في جلب المختصين:', error);
      socket.emit('professionals', []);
    }
  });

  socket.on('private message', async ({ toUserId, message, isAnonymous = false }) => {
    const fromUserId = connectedUsers.get(socket.id);
    if (!fromUserId) return;
    const recipientId = parseInt(toUserId);

    try {
      const [recipient] = await sql`SELECT id, role FROM users WHERE id = ${recipientId}`;
      if (!recipient) return socket.emit('message sent', { success: false, error: 'المستخدم غير موجود' });

      const convType = recipent.role === 'professional' ? 'consult' : 'peer';

      let conversation = await sql`
        SELECT id, is_anonymous FROM conversations 
        WHERE ((user1_id = ${fromUserId} AND user2_id = ${recipientId}) OR (user1_id = ${recipientId} AND user2_id = ${fromUserId}))
          AND type = ${convType} LIMIT 1
      `;

      let conversationId, finalIsAnonymous = isAnonymous;
      if (conversation.length === 0) {
        const newConv = await sql`
          INSERT INTO conversations (user1_id, user2_id, type, is_anonymous)
          VALUES (${fromUserId}, ${recipientId}, ${convType}, ${isAnonymous}) RETURNING id
        `;
        conversationId = newConv[0].id;
      } else {
        conversationId = conversation[0].id;
        finalIsAnonymous = conversation[0].is_anonymous;
      }

      await sql`INSERT INTO messages (conversation_id, sender_id, message_text) VALUES (${conversationId}, ${fromUserId}, ${message})`;

      const senderData = finalIsAnonymous
        ? { id: 0, username: 'مستخدم مجهول' }
        : await sql`SELECT id, username FROM users WHERE id = ${fromUserId}`.then(r => r[0]);

      const recipientSocketId = [...connectedUsers.entries()].find(([, id]) => id === recipientId)?.[0];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('private message', {
          conversationId, from: senderData, message, timestamp: new Date().toISOString()
        });
      }
      socket.emit('message sent', { success: true, conversationId });
    } catch (error) {
      console.error('❌ خطأ في إرسال الرسالة:', error);
      socket.emit('message sent', { success: false, error: error.message });
    }
  });

  socket.on('get messages', async (conversationId) => {
    const userId = connectedUsers.get(socket.id);
    if (!userId) return;
    try {
      const [conv] = await sql`SELECT id, is_anonymous, user1_id, user2_id FROM conversations WHERE id = ${conversationId}`;
      if (!conv) return socket.emit('messages', []);
      const isParticipant = conv.user1_id === userId || conv.user2_id === userId;
      if (!isParticipant) return socket.emit('messages', []);

      let query;
      if (conv.is_anonymous) {
        query = sql`
          SELECT m.id, m.conversation_id, m.sender_id,
            CASE WHEN m.sender_id = ${userId} THEN (SELECT username FROM users WHERE id = ${userId}) ELSE 'مستخدم مجهول' END as sender_name,
            m.message_text, m.timestamp, m.is_read
          FROM messages m WHERE m.conversation_id = ${conversationId} ORDER BY m.timestamp ASC
        `;
      } else {
        query = sql`
          SELECT m.id, m.conversation_id, m.sender_id, u.username as sender_name,
            m.message_text, m.timestamp, m.is_read
          FROM messages m JOIN users u ON m.sender_id = u.id
          WHERE m.conversation_id = ${conversationId} ORDER BY m.timestamp ASC
        `;
      }
      const messages = await query;
      socket.emit('messages', messages);
    } catch (error) {
      console.error('❌ خطأ في جلب الرسائل:', error);
      socket.emit('messages', []);
    }
  });

  socket.on('disconnect', () => {
    console.log('👋 مستخدم غير متصل:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 خادم Socket.IO يعمل على المنفذ ${PORT}`);
});