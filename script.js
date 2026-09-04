const launcher = document.getElementById('assistantLauncher');
const panel = document.getElementById('assistantPanel');
const closeButton = document.getElementById('closeAssistant');
const minimizeButton = document.getElementById('minimizeAssistant');
const chatForm = document.getElementById('chatForm');

function openAssistant() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');

    launcher.style.display = 'none';
}

function closeAssistant() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');

    launcher.style.display = 'flex';
}

launcher.addEventListener('click', openAssistant);

closeButton.addEventListener('click', closeAssistant);

minimizeButton.addEventListener('click', closeAssistant);

chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
});
