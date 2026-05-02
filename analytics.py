import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import psycopg2 # المكتبة المسؤولة عن الاتصال بقاعدة بيانات Postgres (Neon)
import os
import re

# --- 1. الاتصال بقاعدة البيانات ---
# تأكد من إضافة DATABASE_URL في الـ Secrets بـ Replit
DATABASE_URL = os.environ.get('DATABASE_URL')

def get_data():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        query = "SELECT content, ai_insight, created_at FROM messages"
        df = pd.read_sql(query, conn)
        conn.close()
        return df
    except Exception as e:
        print(f"خطأ في الاتصال بقاعدة البيانات: {e}")
        return None

# --- 2. معالجة البيانات وتحليل المشاعر (The Engine) ---
def process_insights(df):
    # استخراج مستوى القلق (Score) من النص باستخدام Regular Expressions
    def extract_score(text):
        match = re.search(r'SCORE:\s*(\d+)', str(text))
        return int(match.group(1)) if match else np.nan

    df['anxiety_score'] = df['ai_insight'].apply(extract_score)

    # تحويل الوقت لصيغة مناسبة للتحليل الزمني
    df['created_at'] = pd.to_datetime(df['created_at'])

    return df

# --- 3. توليد التقارير الذكية (Insights Generation) ---
def generate_report(df):
    print("--- تقرير أمان الذكي (Aman Insights Report) ---")

    # متوسط مستوى القلق العام
    avg_anxiety = df['anxiety_score'].mean()
    print(f"🔹 متوسط مستوى القلق في المجتمع حالياً: {avg_anxiety:.2f}/10")

    # تصنيف الحالات حسب الخطورة
    risk_levels = pd.cut(df['anxiety_score'], 
                         bins=[0, 3, 7, 10], 
                         labels=['منخفض (طبيعي)', 'متوسط (يحتاج دعم)', 'عالي (طوارئ)'])
    print("\n🔹 توزيع مستويات الخطورة:")
    print(risk_levels.value_counts())

    # تحليل "الكلمات المفتاحية" الأكثر تكراراً (RAG Statistics)
    keywords = ['خوف', 'جوع', 'دواء', 'نوم', 'حزن']
    counts = {key: df['content'].str.contains(key).sum() for key in keywords}
    print("\n🔹 أكثر الاحتياجات إلحاحاً:")
    for k, v in counts.items():
        print(f"- {k}: {v} حالة")

# --- 4. التمثيل البياني (Visualization) ---
def plot_trends(df):
    plt.figure(figsize=(10, 6))

    # رسم بياني لخط الزمن (Trend Line)
    df.set_index('created_at')['anxiety_score'].resample('D').mean().plot(kind='line', marker='o')

    plt.title('مؤشر القلق العام عبر الزمن - تطبيق أمان')
    plt.xlabel('التاريخ')
    plt.ylabel('متوسط مستوى القلق')
    plt.grid(True)
    plt.savefig('anxiety_trend.png') # حفظ الصورة لتقديمها في المسابقة
    print("\n✅ تم توليد الرسم البياني: anxiety_trend.png")

# --- التشغيل التجريبي ---
if __name__ == "__main__":
    data = get_data()
    if data is not None:
        processed_data = process_insights(data)
        generate_report(processed_data)
        plot_trends(processed_data)
