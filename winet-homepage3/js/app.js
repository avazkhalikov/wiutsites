/**
 * WINET 3.0 - Ultimate Edition
 * Apple-Level Interactive Experience
 * 
 * Features:
 * - Custom Cursor with Magnetic Effect
 * - Scroll-Triggered Animations
 * - 3D Card Interactions
 * - Command Palette
 * - AI Assistant
 * - Animated Counters
 * - Role Switching
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
    initHeroGreeting();
    initCustomCursor();
    initScrollAnimations();
    initCounters();
    initRoleSwitcher();
    initCommandPalette();
    initAIAssistant();
    initMagneticButtons();
    init3DCards();
    initServiceTiles();
    initKeyboardShortcuts();
    
    // Console branding
    console.log('%c✨ WINET 3.0 Ultimate', 'color: #4DACE1; font-size: 32px; font-weight: 900; text-shadow: 2px 2px 0 #264F9D;');
    console.log('%cThe Future of Education', 'color: #358A7C; font-size: 16px; font-weight: 500;');
    console.log('%cWestminster International University in Tashkent', 'color: #888; font-size: 12px;');
});

// ============================================
// Theme Toggle (Light/Dark Mode)
// ============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check saved preference (default to light)
    const savedTheme = localStorage.getItem('winet3-theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = html.classList.contains('dark');
            
            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('winet3-theme', 'light');
                showNotification('☀️ Light mode enabled');
            } else {
                html.classList.add('dark');
                localStorage.setItem('winet3-theme', 'dark');
                showNotification('🌙 Dark mode enabled');
            }
            
            // Re-init icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }
}

// ============================================
// Hero Greeting (Dynamic)
// ============================================
function initHeroGreeting() {
    const hour = new Date().getHours();
    const heroGreeting = document.getElementById('heroGreeting');
    const heroDate = document.getElementById('heroDate');
    
    // Set greeting based on time
    let greeting = 'Good morning,';
    if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon,';
    } else if (hour >= 17 || hour < 5) {
        greeting = 'Good evening,';
    }
    
    if (heroGreeting) {
        heroGreeting.textContent = greeting;
    }
    
    // Set current date
    if (heroDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        heroDate.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// ============================================
// Custom Cursor
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        const ease = 0.15;
        const dotEase = 0.25;
        
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        dotX += (mouseX - dotX) * dotEase;
        dotY += (mouseY - dotY) * dotEase;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, [role="button"], .bento-card-3d, .photo-card, .service-tile');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// ============================================
// Scroll-Triggered Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, observerOptions);
    
    // Observe reveal elements
    document.querySelectorAll('.reveal-up, .bento-card-3d, .photo-card').forEach(el => {
        observer.observe(el);
    });
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

function animateCounter(counter) {
    const target = parseFloat(counter.dataset.target);
    if (isNaN(target)) return;
    
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out expo
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = target * easeProgress;
        
        if (isDecimal) {
            counter.textContent = current.toFixed(1);
        } else {
            counter.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// Role Switcher
// ============================================
function initRoleSwitcher() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const workspaceViews = document.querySelectorAll('.workspace-view');
    
    const userData = {
        student: {
            name: 'John Doe',
            firstName: 'John',
            role: 'Student',
            summary: 'You have 3 classes today and 2 upcoming deadlines',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
        },
        staff: {
            name: 'Dr. Sarah Smith',
            firstName: 'Sarah',
            role: 'Academic Staff',
            summary: 'You have 2 teaching sessions and 23 submissions to grade',
            avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face'
        },
        admin: {
            name: 'Admin User',
            firstName: 'Admin',
            role: 'Administrator',
            summary: 'All systems operational • 1,234 users active now',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face'
        }
    };
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Update button states
            roleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Switch workspace views
            workspaceViews.forEach(view => {
                if (view.dataset.view === role) {
                    view.classList.remove('hidden');
                    // Re-trigger animations
                    view.querySelectorAll('.bento-card-3d').forEach((card, index) => {
                        card.style.animation = 'none';
                        card.offsetHeight;
                        card.style.animation = `bento-reveal 1s var(--ease-out-expo) forwards`;
                        card.style.animationDelay = `${0.1 + index * 0.05}s`;
                    });
                } else {
                    view.classList.add('hidden');
                }
            });
            
            // Update header and hero user info
            const user = userData[role];
            const userNameEl = document.getElementById('userName');
            const userRoleEl = document.getElementById('userRole');
            const profileImg = document.querySelector('header img');
            const heroName = document.getElementById('heroName');
            const heroSummary = document.getElementById('heroSummary');
            
            if (userNameEl) userNameEl.textContent = user.name;
            if (userRoleEl) userRoleEl.textContent = user.role;
            if (profileImg) profileImg.src = user.avatar;
            if (heroName) heroName.textContent = user.firstName;
            if (heroSummary) heroSummary.textContent = user.summary;
            
            // Re-init counters
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
// Command Palette
// ============================================
function initCommandPalette() {
    const cmdPalette = document.getElementById('cmdPalette');
    const cmdOverlay = document.getElementById('cmdOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!cmdPalette) return;
    
    function openPalette() {
        cmdPalette.classList.remove('hidden');
        cmdPalette.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => cmdInput?.focus(), 100);
    }
    
    function closePalette() {
        cmdPalette.classList.add('hidden');
        cmdPalette.classList.remove('show');
        document.body.style.overflow = '';
        if (cmdInput) cmdInput.value = '';
    }
    
    // Open with button
    searchBtn?.addEventListener('click', openPalette);
    
    // Close with overlay click
    cmdOverlay?.addEventListener('click', closePalette);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            cmdPalette.classList.contains('hidden') ? openPalette() : closePalette();
        }
        if (e.key === 'Escape' && !cmdPalette.classList.contains('hidden')) {
            closePalette();
        }
    });
    
    // Command items click
    cmdPalette.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.querySelector('p')?.textContent || 'Action';
            showNotification(`Opening: ${text}...`);
            closePalette();
        });
    });
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
            // Remove badge
            const badge = aiChatToggle.querySelector('span');
            if (badge) badge.remove();
            setTimeout(() => aiChatInput?.focus(), 100);
        } else {
            aiChatWindow.classList.add('hidden');
            aiIconOpen?.classList.remove('hidden');
            aiIconClose?.classList.add('hidden');
        }
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
                <div class="bg-gradient-to-r from-wiut-blue to-wiut-sky text-white rounded-2xl rounded-tr-none p-4 inline-block max-w-[80%] text-left">
                    <p class="text-sm">${escapeHtml(message)}</p>
                </div>
            </div>
        `;
        aiChatMessages.appendChild(userMsg);
        aiChatInput.value = '';
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        
        // AI response
        setTimeout(() => {
            const responses = [
                "I found that for you! Let me show you the way. 🎯",
                "Great question! Here's what I can tell you... ✨",
                "I'm on it! Checking our systems now... 🔍",
                "Absolutely! Here's the information you need. 📚",
                "Let me help you with that right away! 🚀"
            ];
            
            const aiMsg = document.createElement('div');
            aiMsg.className = 'flex items-start space-x-3';
            aiMsg.innerHTML = `
                <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-wiut-blue to-wiut-sky flex items-center justify-center flex-shrink-0">
                    <i data-lucide="bot" class="w-4 h-4 text-white"></i>
                </div>
                <div class="flex-1">
                    <div class="bg-white/[0.05] rounded-2xl rounded-tl-none p-4 border border-white/[0.08]">
                        <p class="text-white/80 text-sm">${responses[Math.floor(Math.random() * responses.length)]}</p>
                    </div>
                </div>
            `;
            aiChatMessages.appendChild(aiMsg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 800);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    aiChatToggle.addEventListener('click', toggleChat);
    aiChatClose?.addEventListener('click', toggleChat);
    aiSendBtn?.addEventListener('click', sendMessage);
    
    aiChatInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick action buttons
    document.querySelectorAll('.ai-quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (aiChatInput) {
                aiChatInput.value = this.textContent.trim();
                sendMessage();
            }
        });
    });
}

// ============================================
// Magnetic Button Effect
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// 3D Card Tilt Effect
// ============================================
function init3DCards() {
    const cards = document.querySelectorAll('.bento-card-3d > div');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * -10;
            const rotateY = (x - 0.5) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// ============================================
// Service Tile Interactions
// ============================================
function initServiceTiles() {
    const tiles = document.querySelectorAll('.service-tile');
    
    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            e.preventDefault();
            const name = tile.querySelector('h4')?.textContent || 'Service';
            showNotification(`Opening ${name}...`);
        });
    });
}

// ============================================
// Keyboard Shortcuts
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;
        
        // Number keys for role switching
        if (['1', '2', '3'].includes(e.key)) {
            const roleMap = { '1': 'student', '2': 'staff', '3': 'admin' };
            const btn = document.querySelector(`.role-btn[data-role="${roleMap[e.key]}"]`);
            if (btn) btn.click();
        }
        
        // T for theme toggle
        if (e.key === 't' || e.key === 'T') {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message) {
    const existing = document.querySelector('.winet-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'winet-notification';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>✨</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ============================================
// Export
// ============================================
if (typeof window !== 'undefined') {
    window.WINET = {
        showNotification,
        version: '3.0 Ultimate'
    };
}
