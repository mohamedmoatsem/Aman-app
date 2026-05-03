import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

const SPECIALTIES: Record<string, string> = {
  "د. سارة محمد":    "طب نفسي وعلاج الصدمات",
  "د. أحمد عمر":     "علاج نفسي معرفي سلوكي",
  "د. منى خالد":    "إرشاد نفسي وعلاقات",
  "د. يوسف إبراهيم": "اضطرابات القلق والاكتئاب",
};

/* ─── helper: get or create anonymous user by deviceId ─── */
async function getOrCreateUser(deviceId: string, displayName?: string): Promise<number> {
  const res = await db.execute(sql`
    SELECT id FROM users WHERE username = ${deviceId} LIMIT 1
  `);
  if (res.rows?.length) return (res.rows[0] as any).id;

  const name = displayName ?? `مستخدم_${deviceId.slice(-4)}`;
  const created = await db.execute(sql`
    INSERT INTO users (username, password_hash, role, is_anonymous)
    VALUES (${deviceId}, ${deviceId}, 'user', true)
    RETURNING id
  `);
  return (created.rows![0] as any).id;
}

/* ─── GET /api/messages/professionals ─── */
router.get("/professionals", async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT id, username FROM users
      WHERE role = 'professional'
      ORDER BY id ASC
    `);
    const rows = (result.rows ?? []).map((r: any) => ({
      ...r,
      specialty: SPECIALTIES[r.username] ?? "مختص نفسي",
      available: true,
    }));
    res.json(rows);
  } catch (err: any) {
    console.error("[professionals] error:", err?.message);
    res.status(500).json({ error: "فشل في جلب قائمة المختصين" });
  }
});

/* ─── GET /api/messages/conversations?deviceId=xxx ─── */
router.get("/conversations", async (req, res) => {
  const deviceId = req.query.deviceId as string;
  if (!deviceId) return res.json([]);

  try {
    const userRes = await db.execute(sql`
      SELECT id FROM users WHERE username = ${deviceId} LIMIT 1
    `);
    if (!userRes.rows?.length) return res.json([]);
    const userId = (userRes.rows[0] as any).id;

    const convs = await db.execute(sql`
      SELECT
        c.id,
        c.type,
        c.is_anonymous,
        c.created_at,
        u1.id   AS user1_id,  u1.username AS user1_name,  u1.role AS user1_role,
        u2.id   AS user2_id,  u2.username AS user2_name,  u2.role AS user2_role,
        (SELECT message_text FROM messages WHERE conversation_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message,
        (SELECT timestamp   FROM messages WHERE conversation_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message_at,
        (SELECT COUNT(*)    FROM messages WHERE conversation_id = c.id AND sender_id != ${userId} AND is_read = false) AS unread_count
      FROM conversations c
      JOIN users u1 ON u1.id = c.user1_id
      JOIN users u2 ON u2.id = c.user2_id
      WHERE c.user1_id = ${userId} OR c.user2_id = ${userId}
      ORDER BY last_message_at DESC NULLS LAST
    `);
    return res.json(convs.rows ?? []);
  } catch (err: any) {
    console.error("[conversations] error:", err?.message);
    return res.status(500).json({ error: "فشل في جلب المحادثات" });
  }
});

/* ─── GET /api/messages/:conversationId ─── */
router.get("/:conversationId", async (req, res) => {
  const convId = parseInt(req.params.conversationId);
  if (isNaN(convId)) return res.status(400).json({ error: "معرّف المحادثة غير صحيح" });
  try {
    const result = await db.execute(sql`
      SELECT m.id, m.conversation_id, m.sender_id, m.message_text, m.timestamp, m.is_read, m.ai_insight,
             u.username AS sender_name, u.role AS sender_role
      FROM messages m
      JOIN users u ON u.id = m.sender_id
      WHERE m.conversation_id = ${convId}
      ORDER BY m.timestamp ASC
      LIMIT 200
    `);
    return res.json(result.rows ?? []);
  } catch (err: any) {
    console.error("[messages GET] error:", err?.message);
    return res.status(500).json({ error: "فشل في جلب الرسائل" });
  }
});

/* ─── POST /api/messages/start ─── */
router.post("/start", async (req, res) => {
  const { deviceId, professionalId, isAnonymous = true, displayName } = req.body as {
    deviceId: string;
    professionalId: number;
    isAnonymous?: boolean;
    displayName?: string;
  };

  if (!deviceId || !professionalId) {
    return res.status(400).json({ error: "بيانات ناقصة" });
  }

  try {
    const userId = await getOrCreateUser(deviceId, displayName);

    const existing = await db.execute(sql`
      SELECT id FROM conversations
      WHERE (user1_id = ${userId} AND user2_id = ${professionalId})
         OR (user1_id = ${professionalId} AND user2_id = ${userId})
      LIMIT 1
    `);

    if (existing.rows?.length) {
      return res.json({ conversationId: (existing.rows[0] as any).id, userId });
    }

    const conv = await db.execute(sql`
      INSERT INTO conversations (user1_id, user2_id, type, is_anonymous)
      VALUES (${userId}, ${professionalId}, 'consult', ${isAnonymous})
      RETURNING id
    `);

    const convId = (conv.rows![0] as any).id;

    await db.execute(sql`
      INSERT INTO messages (conversation_id, sender_id, message_text)
      VALUES (${convId}, ${professionalId},
        ${'السلام عليكم ورحمة الله. أنا هنا للاستماع إليكم وتقديم الدعم المناسب. تفضل/تفضلي بمشاركتي ما تودّ/تودّين التحدث عنه.'})
    `);

    return res.status(201).json({ conversationId: convId, userId });
  } catch (err: any) {
    console.error("[start] error:", err?.message);
    return res.status(500).json({ error: "فشل في بدء المحادثة" });
  }
});

/* ─── POST /api/messages/:conversationId/send ─── */
router.post("/:conversationId/send", async (req, res) => {
  const convId = parseInt(req.params.conversationId);
  if (isNaN(convId)) return res.status(400).json({ error: "معرّف غير صحيح" });
  const { deviceId, text } = req.body as { deviceId: string; text: string };

  if (!deviceId || !text?.trim()) {
    return res.status(400).json({ error: "بيانات ناقصة" });
  }

  try {
    const userRes = await db.execute(sql`
      SELECT id FROM users WHERE username = ${deviceId} LIMIT 1
    `);
    if (!userRes.rows?.length) return res.status(404).json({ error: "المستخدم غير موجود" });
    const userId = (userRes.rows[0] as any).id;

    const msg = await db.execute(sql`
      INSERT INTO messages (conversation_id, sender_id, message_text)
      VALUES (${convId}, ${userId}, ${text.trim()})
      RETURNING id, conversation_id, sender_id, message_text, timestamp, is_read
    `);

    return res.status(201).json(msg.rows![0]);
  } catch (err: any) {
    console.error("[send] error:", err?.message);
    return res.status(500).json({ error: "فشل في إرسال الرسالة" });
  }
});

/* ─── POST /api/messages/:conversationId/read ─── */
router.post("/:conversationId/read", async (req, res) => {
  const convId = parseInt(req.params.conversationId);
  if (isNaN(convId)) return res.json({ ok: true });
  const { deviceId } = req.body as { deviceId: string };

  try {
    const userRes = await db.execute(sql`
      SELECT id FROM users WHERE username = ${deviceId} LIMIT 1
    `);
    if (!userRes.rows?.length) return res.json({ ok: true });
    const userId = (userRes.rows[0] as any).id;

    await db.execute(sql`
      UPDATE messages SET is_read = true
      WHERE conversation_id = ${convId} AND sender_id != ${userId} AND is_read = false
    `);
    return res.json({ ok: true });
  } catch {
    return res.json({ ok: true });
  }
});

export default router;
