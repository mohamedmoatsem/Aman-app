import postgres from 'postgres';

/**
 * رابط الاتصال الخاص بك بـ Neon PostgreSQL
 */
const connectionString = 'postgresql://neondb_owner:npg_Eh35eBfOmupW@ep-curly-pine-ab21hcpv-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require';

// التعديل الأساسي: أضفنا كلمة export هنا ليراها المجلدات الأخرى
export const sql = postgres(connectionString);

/**
 * وظيفة فحص الاتصال وتهيئة الجداول
 */
export async function testConnection() {
  try {
    const result = await sql`SELECT 1+1 AS result`;
    console.log("✅ تم الاتصال بقاعدة بيانات Neon بنجاح!");

    // إنشاء جدول المشتركين
    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // إنشاء جدول الرسائل لدعم محادثات Gemma 4
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        content TEXT NOT NULL,
        ai_response TEXT,
        mood_category TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("📊 جداول قاعدة البيانات جاهزة ومحدثة.");

  } catch (error) {
    console.error("❌ فشل الاتصال بقاعدة البيانات:", error.message);
    throw error; 
  }
}

// تصدير افتراضي أيضاً لزيادة التوافق
export default sql;
