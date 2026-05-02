import { Router } from "express";

const router = Router();

// مسار فحص حالة السيرفر (Health Check)
router.get("/healthz", (_req, res) => {
  // إرجاع استجابة بسيطة تؤكد أن السيرفر يعمل
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Aman Backend"
  });
});

export default router;
