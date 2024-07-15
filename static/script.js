function showAbout() {
    document.getElementById("about-overlay").style.display = "flex";
}

function closeAbout() {
    document.getElementById("about-overlay").style.display = "none";
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function dimSections(activeSection) {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        if (index + 1 !== activeSection) {
            section.classList.add('dimmed');
        } else {
            section.classList.remove('dimmed');
        }
    });
}

function analyzeText() {
    const text = document.getElementById('text-analysis').value;
    if (text.trim() === "") {
        alert("Lütfen metin giriniz.");
        return;
    }
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, type: 'text_analysis' })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.result);
    });
}

function classifyText() {
    const text = document.getElementById('text-classification').value;
    if (text.trim() === "") {
        alert("Lütfen metin giriniz.");
        return;
    }
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, type: 'text_classification' })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.result);
    });
}

function analyzeSentiment() {
    const text = document.getElementById('sentiment-analysis').value;
    if (text.trim() === "") {
        alert("Lütfen metin giriniz.");
        return;
    }
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, type: 'sentiment_analysis' })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.result);
    });
}

function answerQuestion() {
    const context = document.getElementById('qa-context').value;
    const question = document.getElementById('qa-question').value;
    if (context.trim() === "" || question.trim() === "") {
        alert("Lütfen metin ve soru giriniz.");
        return;
    }
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: context, type: 'question_answering', question: question })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.result);
    });
}
