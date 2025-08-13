from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Твой ключ
API_KEY = "AIzaSyCXByIx8XgHzZHOKciZxT-QW5K0Pk4OYgw"

# Настройка Gemini
genai.configure(api_key=API_KEY)


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("prompt", "")

    if not question:
        return jsonify({"error": "Нет вопроса"}), 400

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(question)
        answer = response.text
        return jsonify({"answer": answer})
    except Exception as e:
        print("Ошибка:", e)
        return jsonify({"error": "Ошибка API"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
