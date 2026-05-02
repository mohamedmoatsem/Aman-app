import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { setupAuth } from "./auth.js"; 
import { testConnection } from "./db.js"; 

// استيراد الراوتر الرئيسي من مجلد src
import apiRouter from "./src/routes/index.ts";

const app = express();

// 1. الإعدادات الأساسية ونظام الجلسات (المطلوب لحل خطأ الصورة 1000060430)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "aman_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * المحرك الرئيسي لبدء سيرفر "أمان"
 */
async function startServer() {
  try {
    console.log("⏳ جاري فحص الاتصال بقاعدة البيانات...");

    // 2. فحص اتصال Neon (تأكد أن ملف db.js يحتوي على export لـ testConnection)
    await testConnection();

    // 3. إعداد نظام المصادقة
    setupAuth(app);

    // 4. ربط مسارات الـ API
    app.use("/api", apiRouter);

    // 5. تشغيل السيرفر على المنفذ المفتوح 8080
    const PORT = 8080;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`
--------------------------------------------------
🚀 سيرفر تطبيق "أمان" يعمل الآن بنجاح!
✅ تم الاتصال بـ Neon PostgreSQL
🔗 المسارات جاهزة: /api/chat & /api/subscribe
--------------------------------------------------
      `);
    });

  } catch (err) {
    console.error("❌ فشل تشغيل السيرفر:", err.message);
    process.exit(1);
  }
}

// انطلاق!
startServer();
