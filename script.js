const BACKEND_URL =
    'https://script.google.com/macros/s/AKfycbxguhTn7cnkDsZHF0J9v0JvyEvFZ4IPMeVdkG25--hd9vxkEFMBgWTFK0KWaw1XZXWj/exec';


const launcher = document.getElementById('assistantLauncher');
const panel = document.getElementById('assistantPanel');
const closeButton = document.getElementById('closeAssistant');
const minimizeButton = document.getElementById('minimizeAssistant');

const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');


// -------------------------------------------------------------
// Conversation memory
// -------------------------------------------------------------

const conversationHistory = [];


// -------------------------------------------------------------
// Open / close assistant
// -------------------------------------------------------------

function openAssistant() {

    panel.classList.add('open');

    panel.setAttribute(
        'aria-hidden',
        'false'
    );

    launcher.style.display = 'none';

    chatInput.focus();
}


function closeAssistant() {

    panel.classList.remove('open');

    panel.setAttribute(
        'aria-hidden',
        'true'
    );

    launcher.style.display = 'flex';
}


// -------------------------------------------------------------
// Customer message
// -------------------------------------------------------------

function addUserMessage(text) {

    const message =
        document.createElement('div');

    message.className =
        'message user-message';

    message.innerHTML = `
        <div class="bubble">
            ${escapeHtml(text)}
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop =
        chatBody.scrollHeight;
}


// -------------------------------------------------------------
// Assistant message
// -------------------------------------------------------------

function addBotMessage(text) {

    const message =
        document.createElement('div');

    message.className =
        'message bot-message';

    message.innerHTML = `
        <span class="message-avatar">✦</span>

        <div class="bubble">
            ${escapeHtml(text)}
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop =
        chatBody.scrollHeight;
}


// -------------------------------------------------------------
// Typing indicator
// -------------------------------------------------------------

function showTypingIndicator() {

    const message =
        document.createElement('div');

    message.className =
        'message bot-message';

    message.innerHTML = `
        <span class="message-avatar">✦</span>

        <div class="bubble"
             id="typingIndicator">
            •
        </div>
    `;

    chatBody.appendChild(message);

    chatBody.scrollTop =
        chatBody.scrollHeight;


    const bubble =
        message.querySelector(
            '#typingIndicator'
        );


    let step = 1;


    const timer =
        window.setInterval(
            function() {

                step++;

                if (step > 3) {
                    step = 1;
                }


                if (step === 1) {
                    bubble.textContent = '•';
                }

                if (step === 2) {
                    bubble.textContent = '•  •';
                }

                if (step === 3) {
                    bubble.textContent =
                        '•  •  •';
                }

            },
            450
        );


    message.typingTimer = timer;


    return message;
}


function removeTypingIndicator(message) {

    if (!message) {
        return;
    }


    if (message.typingTimer) {

        window.clearInterval(
            message.typingTimer
        );
    }


    message.remove();
}


// -------------------------------------------------------------
// Safe text
// -------------------------------------------------------------

function escapeHtml(text) {

    const div =
        document.createElement('div');

    div.textContent = text;

    return div.innerHTML;
}


// -------------------------------------------------------------
// Keep conversation memory reasonably small
// -------------------------------------------------------------

function getConversationHistory() {

    return conversationHistory.slice(-20);
}


// -------------------------------------------------------------
// Send message + conversation history to Apps Script
// -------------------------------------------------------------

async function sendToBackend(customerMessage) {

    const response =
        await fetch(
            BACKEND_URL,
            {

                method: 'POST',

                redirect: 'follow',

                headers: {
                    'Content-Type':
                        'text/plain;charset=utf-8'
                },

                body: JSON.stringify({

                    message:
                        customerMessage,

                    history:
                        getConversationHistory()

                })
            }
        );


    if (!response.ok) {

        throw new Error(
            'Backend request failed'
        );
    }


    const data =
        await response.json();


    if (!data.ok) {

        throw new Error(
            data.error ||
            'Backend error'
        );
    }


    return data.reply;
}


// -------------------------------------------------------------
// Events
// -------------------------------------------------------------

launcher.addEventListener(
    'click',
    openAssistant
);


closeButton.addEventListener(
    'click',
    closeAssistant
);


minimizeButton.addEventListener(
    'click',
    closeAssistant
);


// -------------------------------------------------------------
// Customer sends a message
// -------------------------------------------------------------

chatForm.addEventListener(
    'submit',
    async function(event) {

        event.preventDefault();


        const customerMessage =
            chatInput.value.trim();


        if (!customerMessage) {
            return;
        }


        // Show customer message
        addUserMessage(
            customerMessage
        );


        // Save customer message in memory
        conversationHistory.push({
            role: 'customer',
            text: customerMessage
        });


        chatInput.value = '';

        chatInput.disabled = true;


        const typingMessage =
            showTypingIndicator();


        try {

            const reply =
                await sendToBackend(
                    customerMessage
                );


            removeTypingIndicator(
                typingMessage
            );


            // Show assistant response
            addBotMessage(
                reply
            );


            // Save assistant response in memory
            conversationHistory.push({
                role: 'assistant',
                text: reply
            });


        } catch (error) {

            console.error(error);


            removeTypingIndicator(
                typingMessage
            );


            const errorMessage =
                'দুঃখিত, এই মুহূর্তে আপনার বার্তাটি প্রসেস করা যাচ্ছে না।';


            addBotMessage(
                errorMessage
            );


        } finally {

            chatInput.disabled = false;

            chatInput.focus();
        }
    }
);
