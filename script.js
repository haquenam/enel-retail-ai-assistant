const BACKEND_URL =
    'https://script.google.com/macros/s/AKfycbxguhTn7cnkDsZHF0J9v0JvyEvFZ4IPMeVdkG25--hd9vxkEFMBgWTFK0KWaw1XZXWj/exec';


const launcher = document.getElementById('assistantLauncher');
const panel = document.getElementById('assistantPanel');
const closeButton = document.getElementById('closeAssistant');
const minimizeButton = document.getElementById('minimizeAssistant');

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');


function openAssistant() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');

    launcher.style.display = 'none';

    chatInput.focus();
}


function closeAssistant() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');

    launcher.style.display = 'flex';
}


function addUserMessage(text) {

    const message = document.createElement('div');

    message.className = 'message user-message';

    message.innerHTML = `
        <div class="bubble">
            ${escapeHtml(text)}
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;
}


function addBotMessage(text) {

    const message = document.createElement('div');

    message.className = 'message bot-message';

    message.innerHTML = `
        <span class="message-avatar">✦</span>

        <div class="bubble">
            ${escapeHtml(text)}
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;
}


function escapeHtml(text) {

    const div = document.createElement('div');

    div.textContent = text;

    return div.innerHTML;
}


async function sendToBackend(customerMessage) {

    const response = await fetch(BACKEND_URL, {

        method: 'POST',

        redirect: 'follow',

        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },

        body: JSON.stringify({
            message: customerMessage
        })
    });


    if (!response.ok) {
        throw new Error('Backend request failed');
    }


    const data = await response.json();


    if (!data.ok) {
        throw new Error(data.error || 'Backend error');
    }


    return data.reply;
}


launcher.addEventListener('click', openAssistant);

closeButton.addEventListener('click', closeAssistant);

minimizeButton.addEventListener('click', closeAssistant);


chatForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const customerMessage = chatInput.value.trim();

    if (!customerMessage) {
        return;
    }


    addUserMessage(customerMessage);

    chatInput.value = '';

    chatInput.disabled = true;


    try {

        const reply = await sendToBackend(customerMessage);

        addBotMessage(reply);

    } catch (error) {

        console.error(error);

        addBotMessage(
            'দুঃখিত, এই মুহূর্তে আপনার বার্তাটি প্রসেস করা যাচ্ছে না।'
        );

    } finally {

        chatInput.disabled = false;

        chatInput.focus();
    }
});
