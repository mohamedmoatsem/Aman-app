import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { workshopsTable, insertWorkshopSchema } from "@workspace/db/schema";
import { CreateWorkshopBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/workshops", async (_req, res) => {
  try {
    const workshops = await db.select().from(workshopsTable).orderBy(workshopsTable.date);
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

router.post("/workshops", async (req, res) => {
  try {
    const parsed = CreateWorkshopBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const validated = insertWorkshopSchema.parse({
      ...parsed.data,
      date: new Date(parsed.data.date),
    });
    const [created] = await db.insert(workshopsTable).values(validated).returning();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create workshop" });
  }
});

export default router;
