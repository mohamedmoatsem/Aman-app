import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, authUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { signToken, requireAuth } from "../middleware/jwtAuth.js";

const router = Router();

router.post("/auth/register", async (req, res) => {
  try {
    const { username, password, role = "user" } = req.body as {
      username: string;
      password: string;
      role?: string;
    };

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }
    if (username.length < 3 || username.length > 50) {
      return res.status(400).json({ error: "Username must be 3–50 characters" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    const allowed = ["user", "professional"];
    if (!allowed.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const existing = await db
      .select({ id: authUsersTable.id })
      .from(authUsersTable)
      .where(eq(authUsersTable.username, username))
      .limit(1);

    if (existing.length > 0) {
      return res.status(409).json({ error: "Username already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db
      .insert(authUsersTable)
      .values({ username, passwordHash, role })
      .returning({ id: authUsersTable.id, username: authUsersTable.username, role: authUsersTable.role });

    const token = signToken({ sub: user.id, username: user.username, role: user.role });
    return res.status(201).json({ token, user });
  } catch (err: any) {
    console.error("[auth/register]", err?.message);
    return res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body as { username: string; password: string };

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const [user] = await db
      .select()
      .from(authUsersTable)
      .where(eq(authUsersTable.username, username))
      .limit(1);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({ sub: user.id, username: user.username, role: user.role });
    return res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err: any) {
    console.error("[auth/login]", err?.message);
    return res.status(500).json({ error: "Login failed" });
  }
});

router.get("/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
