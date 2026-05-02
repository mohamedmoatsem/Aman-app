from flask import Flask, request, jsonify
# تأكد من استيراد نموذج Gemma الخاص بك هنا
# مثال: from your_ai_library import GemmaModel 

app = Flask(__name__)

# هنا نقوم بتعريف محرك الدردشة (chat_engine)
# chat_engine = GemmaModel() 

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('prompt', '')

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # استدعاء نموذج Gemma 4 للحصول على الرد
        # لنفترض أن الوظيفة هي chat_engine.chat()
        # ai_response = chat_engine.chat(user_message)

        # رد تجريبي للتأكد من الاتصال (قم باستبداله برد النموذج الحقيقي)
        ai_response = f"Gemma 4 says: I received your message: {user_message}"

        return jsonify({"response": ai_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # تشغيل السيرفر على المنفذ 5000
    app.run(host='0.0.0.0', port=5000)
