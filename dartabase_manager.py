import psycopg2
import os

# جلب رابط قاعدة البيانات من الـ Secrets
# تأكد أنك أضفته في قائمة Secrets في Replit بنفس الاسم
DATABASE_URL = os.environ.get('DATABASE_URL')

def save_interaction(user_id, content, ai_response, mood, tag):
    """حفظ المحادثة وتصنيفها في قاعدة بيانات Neon"""
    if not DATABASE_URL:
        print("❌ خطأ: رابط DATABASE_URL غير موجود في إعدادات Secrets!")
        return

    try:
        # استخدام sslmode=require ضروري جداً للاتصال بقواعد بيانات Neon
        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        cur = conn.cursor()

        # استعلام الإدخال
        query = """
        INSERT INTO messages (user_id, content, ai_response, mood_category, needs_tag)
        VALUES (%s, %s, %s, %s, %s);
        """

        cur.execute(query, (user_id, content, ai_response, mood, tag))

        conn.commit()
        cur.close()
        conn.close()
        print(f"✅ تم تسجيل البيانات بنجاح في Neon: {mood}")
    except Exception as e:
        print(f"❌ فشل في الحفظ في Neon: {e}")

# دالة التحليل والحفظ
def analyze_and_save(user_message, ai_reply, user_id=1):
    # التصنيف الافتراضي
    mood = "مستقر"
    tag = "دعم عام"

    # قاموس الكلمات المفتاحية للتحليل (Logic الخاص بك)
    keywords = {
        "قلق": ["خوف", "قلق", "توتر", "ضربات قلب"],
        "احتياج": ["جوع", "دواء", "علاج", "مستشفى"],
        "طوارئ": ["انتحار", "إيذاء", "خطر"]
    }

    for category, words in keywords.items():
        if any(word in user_message for word in words):
            mood = category
            tag = "تدخل عاجل" if category == "طوارئ" else "دعم متخصص"
            break

    save_interaction(user_id, user_message, ai_reply, mood, tag)

# مثال للتشغيل (للتجربة)
# analyze_and_save("أشعر بقلق شديد وتوتر", "أنا هنا لأسمعك، تنفس بعمق.")
