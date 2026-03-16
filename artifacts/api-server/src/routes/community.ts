import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { communityPostsTable, insertCommunityPostSchema } from "@workspace/db/schema";
import { CreateCommunityPostBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/community", async (_req, res) => {
  try {
    const posts = await db.select().from(communityPostsTable).orderBy(communityPostsTable.createdAt);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch community posts" });
  }
});

router.post("/community", async (req, res) => {
  try {
    const parsed = CreateCommunityPostBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const validated = insertCommunityPostSchema.parse(parsed.data);
    const [created] = await db.insert(communityPostsTable).values(validated).returning();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create community post" });
  }
});

export default router;
