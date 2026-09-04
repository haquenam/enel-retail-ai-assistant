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


function escapeHtml(text) {

    const div = document.createElement('div');

    div.textContent = text;

    return div.innerHTML;
}


launcher.addEventListener('click', openAssistant);

closeButton.addEventListener('click', closeAssistant);

minimizeButton.addEventListener('click', closeAssistant);


chatForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    addUserMessage(message);

    chatInput.value = '';

    chatInput.focus();
});
