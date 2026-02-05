/**
 * WINET Sanctuary - The Calm Workspace
 * JavaScript Application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all modules
    initGreeting();
    initRoleSwitcher();
    initAIAssistant();
    initMotivationalQuotes();
    
    console.log('%c🏛️ WINET Sanctuary', 'color: #264F9D; font-size: 24px; font-weight: 700;');
    console.log('%cYour calm workspace awaits.', 'color: #358A7C; font-size: 14px;');
});

// ============================================
// Dynamic Greeting
// ============================================
function initGreeting() {
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('currentDate');
    
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    
    if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
    } else if (hour >= 17 || hour < 5) {
        greeting = 'Good evening';
    }
    
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
    
    if (dateEl) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// ============================================
// Motivational Quotes
// ============================================
function initMotivationalQuotes() {
    const quotes = [
        "Today is a beautiful day to learn something new.",
        "Every expert was once a beginner. Keep going!",
        "Your education is a journey, not a race.",
        "Small steps every day lead to big achievements.",
        "Believe in yourself — you're doing great!",
        "Knowledge is the most powerful tool you'll ever have.",
        "Make today count. You've got this! ✨",
        "The future belongs to those who learn.",
        "Every day is a chance to grow and improve.",
        "Your potential is limitless. Keep pushing forward!"
    ];
    
    const motivationEl = document.getElementById('motivation');
    if (motivationEl) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        motivationEl.textContent = randomQuote;
    }
}

// ============================================
// Role Switcher
// ============================================
function initRoleSwitcher() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const views = document.querySelectorAll('.workspace-view');
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Update buttons
            roleButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('text-gray-400');
            });
            this.classList.add('active');
            this.classList.remove('text-gray-400');
            
            // Update views
            views.forEach(view => {
                if (view.dataset.view === role) {
                    view.classList.remove('hidden');
                    // Re-trigger animations
                    view.querySelectorAll('.fade-in').forEach((el, index) => {
                        el.style.animation = 'none';
                        el.offsetHeight; // Trigger reflow
                        el.style.animation = `fadeIn 0.8s ease-out ${index * 0.1}s forwards`;
                    });
                } else {
                    view.classList.add('hidden');
                }
            });
            
            // Update greeting name based on role
            updateGreetingName(role);
        });
    });
}

function updateGreetingName(role) {
    const names = {
        student: 'John',
        staff: 'Dr. Sarah',
        admin: 'Admin'
    };
    
    const motivations = {
        student: [
            "Today is a beautiful day to learn something new.",
            "Every step forward is progress. Keep going!",
            "Your future self will thank you for today's effort."
        ],
        staff: [
            "Your guidance shapes futures. Thank you!",
            "Today's teaching creates tomorrow's leaders.",
            "Making a difference, one student at a time."
        ],
        admin: [
            "Keeping everything running smoothly. Great work!",
            "Behind every success is great administration.",
            "You make the university work. Thank you!"
        ]
    };
    
    // Update name in greeting
    const nameSpan = document.querySelector('.text-gradient');
    if (nameSpan && names[role]) {
        nameSpan.textContent = names[role];
    }
    
    // Update motivation
    const motivationEl = document.getElementById('motivation');
    if (motivationEl && motivations[role]) {
        const quotes = motivations[role];
        motivationEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
}

// ============================================
// AI Assistant
// ============================================
function initAIAssistant() {
    const toggleBtn = document.getElementById('aiToggle');
    const closeBtn = document.getElementById('closeAI');
    const chatWindow = document.getElementById('aiChat');
    const sendBtn = document.getElementById('aiSend');
    const input = document.getElementById('aiInput');
    const messagesContainer = document.getElementById('aiMessages');
    const suggestions = document.querySelectorAll('.ai-suggestion');
    
    // Toggle chat
    if (toggleBtn && chatWindow) {
        toggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            if (!chatWindow.classList.contains('hidden')) {
                input?.focus();
            }
        });
    }
    
    // Close chat
    if (closeBtn && chatWindow) {
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }
    
    // Send message
    function sendMessage() {
        const message = input?.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'ai');
        }, 800);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Quick suggestions
    suggestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            addMessage(text, 'user');
            setTimeout(() => {
                const response = generateResponse(text);
                addMessage(response, 'ai');
            }, 800);
        });
    });
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-3';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex-1"></div>
                <div class="bg-gradient-to-r from-wiut-blue to-wiut-sky rounded-2xl rounded-tr-none p-4 shadow-sm max-w-[80%]">
                    <p class="text-white text-sm">${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-wiut-blue to-wiut-sky flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 max-w-[80%]">
                    <p class="text-gray-700 text-sm">${text}</p>
                </div>
            `;
        }
        
        messagesContainer?.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('schedule') || msg.includes('class') || msg.includes('timetable')) {
            return "📅 Your next class is Business Statistics at 09:00 in Room 301 with Dr. Sarah Smith. After that, you have Microeconomics at 11:00!";
        }
        if (msg.includes('grade') || msg.includes('gpa') || msg.includes('mark')) {
            return "🎓 Your current GPA is 3.7 — that's excellent! Your latest grade was 85% in Microeconomics CW1. Keep up the great work!";
        }
        if (msg.includes('deadline') || msg.includes('due') || msg.includes('assignment')) {
            return "⏰ You have 2 upcoming deadlines: Statistics Report (Feb 7, 2 days) and Economics Essay (Feb 10, 5 days). Need help prioritizing?";
        }
        if (msg.includes('attendance')) {
            return "✅ Your attendance is at 92% — that's above the required 80%. You've attended 46 out of 50 sessions this semester!";
        }
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return "Hello! 👋 I'm here to help you navigate WINET. Ask me about your schedule, grades, deadlines, or anything else!";
        }
        if (msg.includes('thank')) {
            return "You're welcome! 😊 Is there anything else I can help you with today?";
        }
        
        return "I'd be happy to help! You can ask me about your schedule, grades, deadlines, attendance, or any other WINET services. What would you like to know?";
    }
}

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape to close AI chat
    if (e.key === 'Escape') {
        const chatWindow = document.getElementById('aiChat');
        if (chatWindow && !chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('hidden');
        }
    }
    
    // Cmd/Ctrl + K for search (placeholder)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search triggered');
    }
});
