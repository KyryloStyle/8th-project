const input = document.querySelector('.input-wrapper input');
const sendBtn = document.getElementById('sendpic');
const output = document.getElementById('output');
const firstView = document.getElementById('firstView');

function liftPhotos() {
    const images = firstView.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add("img-lifted"); // плавное исчезновение и подъем
    });
}

sendBtn.addEventListener('click', async () => {
    const question = input.value.trim();
    if (!question) return;

    // Добавляем сообщение пользователя
    const userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = question;
    output.appendChild(userMsg);

    liftPhotos();
    input.value = "";

    // Добавляем «загрузка»
    const botMsg = document.createElement('div');
    botMsg.classList.add('message', 'bot');
    botMsg.textContent = "Загружаем ответ...";
    output.appendChild(botMsg);

    // Скролл вниз
    output.scrollTop = output.scrollHeight;

    try {
        const res = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: question })
        });

        const data = await res.json();
        botMsg.textContent = data.answer || "Ошибка API";

    } catch (err) {
        botMsg.textContent = "Ошибка соединения";
    }

    output.scrollTop = output.scrollHeight;
});


input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") sendBtn.click();
});
