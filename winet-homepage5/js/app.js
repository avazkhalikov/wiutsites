/**
 * WINET THE PULSE - Bold & Energetic
 * JavaScript Application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all modules
    initThemeToggle();
    initParticles();
    initCounters();
    initRoleSwitcher();
    initAIAssistant();
    initLiveStatus();
    
    // Console branding
    console.log('%c⚡ WINET THE PULSE', 'color: #4DACE1; font-size: 28px; font-weight: 800; text-shadow: 2px 2px 0 #264F9D;');
    console.log('%cBold. Dynamic. Alive.', 'color: #358A7C; font-size: 14px;');
});

// ============================================
// Theme Toggle
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check saved preference or default to light
    const savedTheme = localStorage.getItem('winet-pulse-theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('winet-pulse-theme', isDark ? 'dark' : 'light');
            
            // Reinitialize icons after theme change
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }
}

// ============================================
// Floating Particles
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = ['#264F9D', '#4DACE1', '#358A7C', '#F6AC10', '#C7293F'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============================================
// Animated Counters
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = target * easeOut;
        
        el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isFloat ? target.toFixed(1) : target;
        }
    }
    
    requestAnimationFrame(update);
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
            
            // Update buttons - remove active and add inactive styles
            roleButtons.forEach(btn => {
                btn.classList.remove('active');
                // Add light/dark mode compatible inactive styles
                btn.className = 'role-btn px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 text-sm font-semibold transition-all';
            });
            
            // Set active button
            this.classList.add('active');
            this.className = 'role-btn active px-6 py-3 rounded-xl text-sm font-semibold transition-all';
            
            // Update views with animation
            views.forEach(view => {
                if (view.dataset.view === role) {
                    view.classList.remove('hidden');
                    view.style.animation = 'none';
                    view.offsetHeight; // Trigger reflow
                    view.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    view.classList.add('hidden');
                }
            });
            
            // Update hero content
            updateHeroContent(role);
            
            // Show notification
            showNotification(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} view`);
            
            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

function updateHeroContent(role) {
    const gradientName = document.querySelector('.gradient-text-animated');
    const heroSubtext = document.getElementById('heroSubtext');
    
    const content = {
        student: {
            name: 'John! 🚀',
            subtext: 'You have <span class="text-wiut-sky font-semibold">3 classes</span> today and <span class="text-wiut-burgundy font-semibold">2 deadlines</span> approaching.'
        },
        staff: {
            name: 'Dr. Sarah! 👩‍🏫',
            subtext: 'You have <span class="text-wiut-sky font-semibold">2 teaching sessions</span> and <span class="text-wiut-burgundy font-semibold">23 submissions</span> to grade.'
        },
        admin: {
            name: 'Admin! ⚙️',
            subtext: '<span class="text-green-600 dark:text-green-400 font-semibold">All systems operational</span> • <span class="text-wiut-sky font-semibold">1,234 users</span> active now.'
        }
    };
    
    if (content[role]) {
        if (gradientName) gradientName.textContent = content[role].name;
        if (heroSubtext) heroSubtext.innerHTML = content[role].subtext;
    }
}

// ============================================
// Live Status
// ============================================
function initLiveStatus() {
    const statusEl = document.getElementById('liveStatus');
    if (!statusEl) return;
    
    function updateStatus() {
        const now = new Date();
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        statusEl.textContent = `Live • ${dateStr} • ${timeStr}`;
    }
    
    updateStatus();
    setInterval(updateStatus, 60000); // Update every minute
}

// ============================================
// Notification
// ============================================
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.pulse-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'pulse-notification fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-wiut-blue to-wiut-sky text-white font-semibold shadow-lg shadow-wiut-blue/30 z-50';
    notification.textContent = message;
    notification.style.animation = 'slideDown 0.3s ease, fadeOut 0.3s ease 2s forwards';
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2500);
}

// Add required animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeOut {
        to { opacity: 0; transform: translate(-50%, -10px); }
    }
`;
document.head.appendChild(style);

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
        
        addMessage(message, 'user');
        input.value = '';
        
        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator flex items-start space-x-3';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-wiut-blue to-wiut-sky flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/10">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-white/40 rounded-full animate-bounce" style="animation-delay: 0ms;"></div>
                    <div class="w-2 h-2 bg-white/40 rounded-full animate-bounce" style="animation-delay: 150ms;"></div>
                    <div class="w-2 h-2 bg-white/40 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
                </div>
            </div>
        `;
        messagesContainer?.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        setTimeout(() => {
            typingDiv.remove();
            const response = generateResponse(message);
            addMessage(response, 'ai');
        }, 1000);
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
            const text = this.textContent.replace(/^[^\s]+\s/, ''); // Remove emoji
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
        messageDiv.style.animation = 'fadeIn 0.3s ease';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex-1"></div>
                <div class="bg-gradient-to-r from-wiut-blue to-wiut-sky rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                    <p class="text-white text-sm">${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-wiut-blue to-wiut-sky flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div class="bg-white/5 rounded-2xl rounded-tl-none p-4 border border-white/10 max-w-[80%]">
                    <p class="text-white/80 text-sm">${text}</p>
                </div>
            `;
        }
        
        messagesContainer?.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('schedule') || msg.includes('class') || msg.includes('timetable')) {
            return "⚡ Your next class is <strong>Business Statistics</strong> at 09:00 in Room 301. After that: Microeconomics (11:00) and Academic English (14:00)!";
        }
        if (msg.includes('grade') || msg.includes('gpa')) {
            return "🎯 Your GPA is <strong>3.7</strong> — up 0.2 from last semester! Your latest grade: <strong>85%</strong> in Microeconomics CW1. Keep crushing it!";
        }
        if (msg.includes('deadline') || msg.includes('due')) {
            return "⏰ <strong>2 urgent deadlines:</strong><br>• Statistics Report — 2 days<br>• Economics Essay — 5 days<br>Want me to set reminders?";
        }
        if (msg.includes('attendance')) {
            return "✅ Your attendance is <strong>92%</strong> — well above the 80% requirement! You've attended 46/50 sessions. Keep showing up!";
        }
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return "Hey there! ⚡ Ready to conquer today? Ask me about your schedule, grades, deadlines, or anything WINET!";
        }
        
        return "⚡ I can help with your schedule, grades, deadlines, attendance, and more. What would you like to know?";
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
});
