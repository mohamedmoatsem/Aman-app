// server/db.js
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL غير موجود في Secrets');
}

const sql = postgres(process.env.DATABASE_URL, {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as time`;
    console.log('✅ متصل بقاعدة البيانات، الوقت الحالي:', result[0].time);
    return true;
  } catch (error) {
    console.error('❌ فشل الاتصال بقاعدة البيانات:', error);
    return false;
  }
}

export default sql;