import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { resourcesTable, insertResourceSchema } from "@workspace/db/schema";
import { CreateResourceBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/resources", async (_req, res) => {
  try {
    const resources = await db.select().from(resourcesTable).orderBy(resourcesTable.createdAt);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

router.post("/resources", async (req, res) => {
  try {
    const parsed = CreateResourceBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    const validated = insertResourceSchema.parse(parsed.data);
    const [created] = await db.insert(resourcesTable).values(validated).returning();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource" });
  }
});

router.get("/resources/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [resource] = await db.select().from(resourcesTable).where(eq(resourcesTable.id, id));
    if (!resource) {
      res.status(404).json({ error: "Resource not found" });
      return;
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});

export default router;
