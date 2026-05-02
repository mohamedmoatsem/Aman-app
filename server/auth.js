import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import sql from "./db.js";

// دالة لتشفير كلمات المرور
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// دالة للمقارنة بين كلمة المرور المدخلة والمخزنة
async function comparePasswords(supplied, stored) {
  return await bcrypt.compare(supplied, stored);
}

export function setupAuth(app) {
  // 1. إعداد استراتيجية التحقق المحلي
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // البحث عن المستخدم في قاعدة البيانات
      const [user] = await sql`SELECT * FROM users WHERE username = ${username}`;

      if (!user) {
        return done(null, false, { message: "المستخدم غير موجود" });
      }

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "كلمة المرور غير صحيحة" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // 2. تخزين بيانات المستخدم في الجلسة (Session)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 3. استعادة بيانات المستخدم من الجلسة
  passport.deserializeUser(async (id, done) => {
    try {
      const [user] = await sql`SELECT * FROM users WHERE id = ${id}`;
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.use(passport.initialize());
  app.use(passport.session());

  // 4. مسارات التسجيل وتسجيل الدخول
  app.post("/api/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      // التأكد من عدم وجود مستخدم بنفس الاسم
      const [existingUser] = await sql`SELECT * FROM users WHERE username = ${username}`;
      if (existingUser) {
        return res.status(400).json({ message: "اسم المستخدم موجود مسبقاً" });
      }

      const hashedPassword = await hashPassword(password);
      const [newUser] = await sql`
        INSERT INTO users (username, password) 
        VALUES (${username}, ${hashedPassword}) 
        RETURNING id, username
      `;

      req.login(newUser, (err) => {
        if (err) return res.status(500).json({ message: "خطأ أثناء تسجيل الدخول" });
        res.status(201).json(newUser);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "خطأ أثناء تسجيل الخروج" });
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}
