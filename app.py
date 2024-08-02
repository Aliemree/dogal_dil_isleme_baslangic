from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)
qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text')
    analysis_type = data.get('type')

    if analysis_type == 'text_analysis':
        word_count = len(text.split())
        return jsonify(result=f'Metin {word_count} kelime içeriyor.')

    elif analysis_type == 'text_classification':
        categories = classify_text(text)
        return jsonify(result=f'Metin sınıfı: {categories}')

    elif analysis_type == 'sentiment_analysis':
        sentiment = analyze_sentiment(text)
        return jsonify(result=f'Duygu analizi sonucu: {sentiment}')

    elif analysis_type == 'question_answering':
        question = data.get('question')
        if question:
            answer = answer_question(text, question)
            return jsonify(result=f'Soru-Cevap: {answer}')
        return jsonify(result='Soru belirtilmedi.')

    elif analysis_type == 'text_to_speech':
        # Sesli okuma işlemi istemci tarafında yapılır.
        return jsonify(result='Metni sesli olarak okuma işlemi istemci tarafında yapılacaktır.')

    return jsonify(result='Geçersiz analiz türü.')


def classify_text(text):
    if "spor" in text:
        return "Spor"
    elif "ekonomi" in text:
        return "Ekonomi"
    elif "siyaset" in text:
        return "Siyaset"
    else:
        return "Diğer"


def analyze_sentiment(text):
    positive_words = ["mutlu", "harika", "iyi", "mükemmel", "güzel"]
    negative_words = ["kötü", "berbat", "korkunç", "üzgün"]
    positive_count = sum(1 for word in text.split() if word in positive_words)
    negative_count = sum(1 for word in text.split() if word in negative_words)
    if positive_count > negative_count:
        return "Pozitif"
    elif negative_count > positive_count:
        return "Negatif"
    else:
        return "Nötr"


def answer_question(text, question):
    result = qa_pipeline({'context': text, 'question': question})
    return result['answer']


if __name__ == '__main__':
    app.run(debug=True)
