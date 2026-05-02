import { Router } from "express";
import healthRouter from "./health.js";
import resourcesRouter from "./resources.js";
import workshopsRouter from "./workshops.js";
import communityRouter from "./community.js";
import subscribeRouter from "./subscribe.js";
import chatRouter from "./chat.js";
import moodRouter from "./mood.js";
import jitaiRouter from "./jitai.js";
import statsRouter from "./stats.js";

const router = Router();

/**
 * تجميع كل المسارات الفرعية في الراوتر الرئيسي
 * ملاحظة: تأكد أن كل ملف فرعي (مثل chat.js) يحتوي على export default router
 */

// 1. مسارات النظام والمعلومات
router.use("/health", healthRouter);
router.use("/resources", resourcesRouter);
router.use("/workshops", workshopsRouter);
router.use("/stats", statsRouter);

// 2. مسارات التفاعل والمجتمع
router.use("/community", communityRouter);
router.use("/subscribe", subscribeRouter); // المسار المسؤول عن زر "اشترك الآن"

// 3. مسارات الذكاء الاصطناعي والدعم النفسي (قلب تطبيق أمان)
router.use("/chat", chatRouter); // المسار المسؤول عن ردود المساعد الذكي
router.use("/mood", moodRouter);
router.use("/jitai", jitaiRouter);

// وساطة لمعالجة الأخطاء في المسارات (Error Handling Middleware)
// إذا طلب المستخدم مساراً غير موجود داخل الـ API
router.use((req, res) => {
  res.status(404).json({
    error: "المسار المطلوب غير موجود في نظام أمان",
    path: req.originalUrl
  });
});

export default router;
