import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { subscribersTable, insertSubscriberSchema } from "@workspace/db/schema";
import { SubscribeBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/subscribe", async (req, res) => {
  try {
    const parsed = SubscribeBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "البريد الإلكتروني غير صحيح" });
      return;
    }
    const validated = insertSubscriberSchema.parse(parsed.data);
    const [created] = await db
      .insert(subscribersTable)
      .values(validated)
      .onConflictDoNothing()
      .returning();

    if (!created) {
      res.status(409).json({ error: "هذا البريد الإلكتروني مشترك بالفعل" });
      return;
    }
    res.status(201).json({ message: "تم الاشتراك بنجاح", email: created.email });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ، يرجى المحاولة مجدداً" });
  }
});

export default router;
