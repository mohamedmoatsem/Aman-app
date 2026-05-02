import { Router } from "express";
import sql from "./db.js";

const router = Router();

router.get("/resources", async (_req, res) => {
  try {
    const resources = await sql`SELECT * FROM resources ORDER BY created_at ASC`;
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

router.post("/resources", async (req, res) => {
  try {
    const { title, content, type } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Invalid request body" });

    const [created] = await sql`
      INSERT INTO resources (title, content, type) 
      VALUES (${title}, ${content}, ${type || 'article'}) 
      RETURNING *`;
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: "Failed to create resource" });
  }
});

router.get("/resources/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [resource] = await sql`SELECT * FROM resources WHERE id = ${id}`;
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resource" });
  }
});

export default router;
