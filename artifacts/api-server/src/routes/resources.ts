import { Router, type IRouter } from "express";

const router: IRouter = Router();

// موارد ثابتة — الجدول غير موجود في قاعدة البيانات بعد
router.get("/resources", async (_req, res) => {
  res.json([]);
});

export default router;
