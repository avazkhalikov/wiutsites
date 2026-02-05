/**
 * WINET 2.0 - State of the Art Edition
 * Advanced Interactions & Animations
 * 
 * Features:
 * - Light/Dark Theme Toggle (Light is default)
 * - Command Palette (Cmd+K)
 * - Role Switching with Rector's Administration
 * - Animated Counters
 * - Staggered Reveals
 */

// ============================================
// Initialize on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all modules
    initThemeToggle();
    initCurrentDate();
    initGreeting();
    initCommandPalette();
    initRoleSwitcher();
    initCounters();
    initTileInteractions();
    initKeyboardShortcuts();
    initAIAssistant();
    
    // Log welcome message
    console.log('%c✨ WINET 2.0', 'color: #264F9D; font-size: 24px; font-weight: bold;');
    console.log('%cState of the Art Edition', 'color: #358A7C; font-size: 14px;');
    console.log('%cWestminster International University in Tashkent', 'color: #6b7280; font-size: 11px;');
});

// ============================================
// Theme Toggle (Light/Dark Mode)
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('winet-theme');
    
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        // Light mode is default
        html.classList.remove('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            html.classList.toggle('dark');
            
            const isDark = html.classList.contains('dark');
            localStorage.setItem('winet-theme', isDark ? 'dark' : 'light');
            
            // Re-initialize icons after theme change
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            
            showNotification(isDark ? 'Dark mode enabled' : 'Light mode enabled');
        });
    }
}

// ============================================
// Current Date
// ============================================
function initCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// ============================================
// Dynamic Greeting
// ============================================
function initGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('h2 span:first-child');
    
    if (greetingElement) {
        let greeting = 'Good morning,';
        
        if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon,';
        } else if (hour >= 17 || hour < 5) {
            greeting = 'Good evening,';
        }
        
        greetingElement.textContent = greeting;
    }
}

// ============================================
// Command Palette (Cmd+K / Ctrl+K)
// ============================================
function initCommandPalette() {
    const cmdPalette = document.getElementById('cmdPalette');
    const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
    const cmdPaletteOverlay = document.getElementById('cmdPaletteOverlay');
    const cmdInput = document.getElementById('cmdInput');
    
    if (!cmdPalette || !cmdPaletteBtn) return;
    
    function openPalette() {
        cmdPalette.classList.remove('hidden');
        cmdPalette.classList.add('show');
        setTimeout(() => {
            cmdInput?.focus();
        }, 100);
    }
    
    function closePalette() {
        cmdPalette.classList.add('hidden');
        cmdPalette.classList.remove('show');
    }
    
    cmdPaletteBtn.addEventListener('click', openPalette);
    cmdPaletteOverlay?.addEventListener('click', closePalette);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !cmdPalette.classList.contains('hidden')) {
            closePalette();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdPalette.classList.contains('hidden')) {
                openPalette();
            } else {
                closePalette();
            }
        }
    });
    
    const cmdItems = cmdPalette.querySelectorAll('button');
    cmdItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p:first-child')?.textContent || 'Action';
            showNotification(`Opening: ${text}...`);
            closePalette();
        });
    });
}

// ============================================
// Role Switcher (Including Rector)
// ============================================
function initRoleSwitcher() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const workspaceViews = document.querySelectorAll('.workspace-view');
    
    // User data for each role
    const userData = {
        student: {
            name: 'John Doe',
            firstName: 'John',
            role: 'Student',
            subtext: "Here's your personalized dashboard",
            avatar: 'JD',
            gradient: 'from-wiut-gold to-wiut-burgundy'
        },
        staff: {
            name: 'Dr. Sarah Smith',
            firstName: 'Sarah',
            role: 'Academic Staff',
            subtext: 'Your teaching overview for today',
            avatar: 'SS',
            gradient: 'from-wiut-teal to-wiut-forest'
        },
        admin: {
            name: 'Admin User',
            firstName: 'Admin',
            role: 'Administrator',
            subtext: 'System status and management tools',
            avatar: 'AU',
            gradient: 'from-wiut-blue to-wiut-sky'
        },
        rector: {
            name: 'Prof. Rector',
            firstName: 'Professor',
            role: "Rector's Administration",
            subtext: 'University executive overview',
            avatar: 'R',
            gradient: 'from-wiut-blue to-wiut-burgundy'
        }
    };
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Update button states
            roleButtons.forEach(btn => {
                btn.classList.remove('bg-gradient-to-r', 'from-wiut-teal', 'to-wiut-forest', 'text-white', 'shadow-lg', 'shadow-wiut-teal/30');
                btn.classList.add('bg-gray-100', 'dark:bg-dark-600', 'text-gray-600', 'dark:text-white/50');
            });
            
            this.classList.remove('bg-gray-100', 'dark:bg-dark-600', 'text-gray-600', 'dark:text-white/50');
            this.classList.add('bg-gradient-to-r', 'from-wiut-teal', 'to-wiut-forest', 'text-white', 'shadow-lg', 'shadow-wiut-teal/30');
            
            // Switch workspace views with animation
            workspaceViews.forEach(view => {
                if (view.dataset.view === role) {
                    view.classList.remove('hidden');
                    // Re-trigger animations
                    view.querySelectorAll('.bento-card').forEach((card, index) => {
                        card.style.animation = 'none';
                        card.offsetHeight; // Trigger reflow
                        card.style.animation = `slideUp 0.6s ease-out forwards`;
                        card.style.animationDelay = `${0.1 + index * 0.05}s`;
                    });
                } else {
                    view.classList.add('hidden');
                }
            });
            
            // Update user info
            const user = userData[role];
            const userNameEl = document.getElementById('userName');
            const userRoleEl = document.getElementById('userRole');
            const userAvatarEl = document.getElementById('userAvatar');
            const greetingNameEl = document.getElementById('greetingName');
            const greetingSubtextEl = document.getElementById('greetingSubtext');
            
            if (userNameEl) userNameEl.textContent = user.name;
            if (userRoleEl) userRoleEl.textContent = user.role;
            if (userAvatarEl) userAvatarEl.textContent = user.avatar;
            if (greetingNameEl) greetingNameEl.textContent = user.firstName;
            if (greetingSubtextEl) greetingSubtextEl.textContent = user.subtext;
            
            // Re-initialize counters for new view
            setTimeout(() => {
                initCounters();
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
            
            showNotification(`Switched to ${user.role} view`);
        });
    });
}

// ============================================
// Animated Counters
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = target * easeOut;
            
            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = isDecimal ? target.toFixed(1) : target;
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ============================================
// Tile Interactions
// ============================================
function initTileInteractions() {
    const tiles = document.querySelectorAll('.tile-card');
    
    tiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            const name = this.querySelector('h4')?.textContent || 'Service';
            showNotification(`Navigating to ${name}...`);
        });
    });
    
    const quickActions = document.querySelectorAll('.bento-card button');
    quickActions.forEach(button => {
        button.addEventListener('click', function(e) {
            const text = this.querySelector('span')?.textContent || 'Action';
            if (text && text.length < 20) {
                showNotification(`Opening: ${text}...`);
            }
        });
    });
}

// ============================================
// Keyboard Shortcuts
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (document.activeElement.tagName === 'INPUT') return;
        
        // Press 'S' to focus search
        if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
            if (cmdPaletteBtn) {
                cmdPaletteBtn.click();
            }
        }
        
        // Press '1', '2', '3', '4' to switch roles
        if (['1', '2', '3', '4'].includes(e.key)) {
            const roleMap = { '1': 'student', '2': 'staff', '3': 'admin', '4': 'rector' };
            const roleBtn = document.querySelector(`.role-btn[data-role="${roleMap[e.key]}"]`);
            if (roleBtn) {
                roleBtn.click();
            }
        }
        
        // Press 'T' to toggle theme
        if (e.key === 't' || e.key === 'T') {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
            }
        }
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.winet-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'winet-notification';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// AI Assistant
// ============================================
function initAIAssistant() {
    const aiChatToggle = document.getElementById('aiChatToggle');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiSendBtn = document.getElementById('aiSendBtn');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiIconOpen = document.getElementById('aiIconOpen');
    const aiIconClose = document.getElementById('aiIconClose');
    
    if (!aiChatToggle || !aiChatWindow) return;
    
    let isOpen = false;
    
    function toggleChat() {
        isOpen = !isOpen;
        if (isOpen) {
            aiChatWindow.classList.remove('hidden');
            aiIconOpen?.classList.add('hidden');
            aiIconClose?.classList.remove('hidden');
            // Remove notification badge
            const badge = aiChatToggle.querySelector('span');
            if (badge) badge.remove();
            // Focus input
            setTimeout(() => aiChatInput?.focus(), 100);
        } else {
            aiChatWindow.classList.add('hidden');
            aiIconOpen?.classList.remove('hidden');
            aiIconClose?.classList.add('hidden');
        }
        // Re-render icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    function sendMessage() {
        const message = aiChatInput?.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'flex items-start space-x-3 justify-end';
        userMsg.innerHTML = `
            <div class="flex-1 text-right">
                <div class="bg-gradient-to-r from-wiut-blue to-wiut-sky text-white rounded-2xl rounded-tr-none p-4 shadow-sm inline-block max-w-[80%] text-left">
                    <p class="text-sm">${escapeHtml(message)}</p>
                </div>
                <p class="text-xs text-gray-400 dark:text-white/30 mt-1 mr-2">Just now</p>
            </div>
        `;
        aiChatMessages.appendChild(userMsg);
        aiChatInput.value = '';
        
        // Scroll to bottom
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I can help you with that! Let me look up the information for you.",
                "Great question! Based on your role, here's what I found...",
                "I'm checking our systems now. This usually takes just a moment.",
                "I understand what you need. Let me guide you to the right place.",
                "That's a common request! Here's how you can do it..."
            ];
            
            const aiMsg = document.createElement('div');
            aiMsg.className = 'flex items-start space-x-3';
            aiMsg.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-wiut-blue to-wiut-sky flex items-center justify-center flex-shrink-0">
                    <i data-lucide="bot" class="w-4 h-4 text-white"></i>
                </div>
                <div class="flex-1">
                    <div class="bg-white dark:bg-dark-700 rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 dark:border-white/5">
                        <p class="text-gray-700 dark:text-white/80 text-sm">${responses[Math.floor(Math.random() * responses.length)]}</p>
                    </div>
                    <p class="text-xs text-gray-400 dark:text-white/30 mt-1 ml-2">Just now</p>
                </div>
            `;
            aiChatMessages.appendChild(aiMsg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 1000);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Event listeners
    aiChatToggle.addEventListener('click', toggleChat);
    aiChatClose?.addEventListener('click', toggleChat);
    aiSendBtn?.addEventListener('click', sendMessage);
    
    aiChatInput?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick action buttons
    const quickBtns = document.querySelectorAll('.ai-quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (aiChatInput) {
                aiChatInput.value = this.textContent.trim();
                sendMessage();
            }
        });
    });
}

// ============================================
// Export for potential module use
// ============================================
if (typeof window !== 'undefined') {
    window.WINET = {
        showNotification,
        toggleTheme: function() {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
    };
}
