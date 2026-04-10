import os
import google.generativeai as genai

# 1. إعداد مفتاح الـ API من Secrets
os.environ["GOOGLE_API_KEY"] = os.environ['Gemini_API_KEY']
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# 2. إعداد النموذج (Gemma 4) مع التعليمات الأساسية لتطبيق أمان
generation_config = {
  "temperature": 0.7,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 1000,
}

model = genai.GenerativeModel(
  model_name="gemma-4-26b-a4b-it", # اسم النموذج الذي اخترته في AI Studio
  generation_config=generation_config,
  system_instruction="أنت 'مساعد أمان'، رفيق داعم وودود. هدفك تقديم الدعم الاجتماعي والنفسي للمستخدمين بلغة عربية بسيطة وقريبة من اللهجة السودانية. كن متعاطفاً ومستمعاً جيداً."
)

# 3. بدء محادثة تجريبية
chat_session = model.start_chat(history=[])

# تجربة رسالة من مستخدم
user_message = "يا مساعد أمان، أنا حاسس بضغط اليوم وتعبان شديد."
response = chat_session.send_message(user_message)

print(f"رد مساعد أمان: {response.text}")
