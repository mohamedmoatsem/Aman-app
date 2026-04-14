import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app) # هذا السطر هو الذي يحل رسالة "ما قدرنا نوصل للخادم"

# إعداد Gemma 4 باستخدام السر (Secret) الذي وضعته
os.environ["GOOGLE_API_KEY"] = os.environ['GEMINI_API_KEY']
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
model = genai.GenerativeModel('gemma-7b')

@app.route('/')
def health_check():
    return "Aman Server is Up and Running!"

@app.route('/ask', methods=['POST'])
def ask_gemma():
    try:
        data = request.json
        # تأكد أن تطبيقك يرسل كلمة 'message' في الطلب
        user_text = data.get('message', '')
        
        if not user_text:
            return jsonify({"reply": "لم أستلم رسالة، حاول مرة أخرى."}), 400
            
        response = model.generate_content(user_text)
        return jsonify({"reply": response.text})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"reply": "عذراً، حدث خطأ فني في الخادم."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
    