const launcher = document.getElementById('assistantLauncher');
const panel = document.getElementById('assistantPanel');
const closeButton = document.getElementById('closeAssistant');
const minimizeButton = document.getElementById('minimizeAssistant');
const openAssistantButtons = document.querySelectorAll('.open-assistant');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const quickActions = document.querySelectorAll('.quick-actions button');

function openAssistant() {
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  launcher.setAttribute('aria-expanded', 'true');
  launcher.style.display = 'none';
  setTimeout(() => chatInput.focus(), 180);
}

function closeAssistant() {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.style.display = 'flex';
}

function addUserMessage(text) {
  const message = document.createElement('div');
  message.className = 'message user-message';
  message.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addDemoReply() {
  const message = document.createElement('div');
  message.className = 'message bot-message';
  message.innerHTML = `
    <span class="message-avatar">✦</span>
    <div class="bubble">
      <strong>ধন্যবাদ।</strong>
      <p>চ্যাটের ইউজার ইন্টারফেস ঠিকভাবে কাজ করছে। পরের ধাপে আমরা এটিকে Lesson 8 এর আসল প্রসেসিংয়ের সাথে যুক্ত করব।</p>
    </div>
  `;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function submitDemoMessage(text) {
  const cleaned = text.trim();
  if (!cleaned) return;

  addUserMessage(cleaned);
  chatInput.value = '';

  window.setTimeout(addDemoReply, 450);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#039;',
      '"': '&quot;'
    };
    return entities[character];
  });
}

launcher.addEventListener('click', openAssistant);
closeButton.addEventListener('click', closeAssistant);
minimizeButton.addEventListener('click', closeAssistant);
openAssistantButtons.forEach((button) => button.addEventListener('click', openAssistant));

quickActions.forEach((button) => {
  button.addEventListener('click', () => {
    submitDemoMessage(button.dataset.question || button.textContent);
  });
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitDemoMessage(chatInput.value);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && panel.classList.contains('open')) {
    closeAssistant();
  }
});
