/**
 * WINET - WIUT Intranet
 * Frontend Interaction Script
 * 
 * This script handles:
 * - Role switching (demo mode)
 * - Mobile menu toggle
 * - Card expand/collapse
 * - Dynamic greeting based on time
 * - Lucide icons initialization
 */

// ============================================
// Initialize Lucide Icons
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set current date
    setCurrentDate();
    
    // Set greeting based on time
    setGreeting();
    
    // Initialize role switcher
    initRoleSwitcher();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize expandable cards
    initExpandableCards();
    
    // Initialize AI Assistant
    initAIAssistant();
});

// ============================================
// Current Date Display
// ============================================
function setCurrentDate() {
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
function setGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('h2');
    
    if (greetingElement) {
        let greeting = 'Good morning';
        
        if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else if (hour >= 17 || hour < 5) {
            greeting = 'Good evening';
        }
        
        const nameSpan = document.getElementById('greetingName');
        const name = nameSpan ? nameSpan.textContent : 'there';
        greetingElement.innerHTML = `${greeting}, <span id="greetingName">${name}</span>! 👋`;
    }
}

// ============================================
// Role Switcher (Demo Mode)
// ============================================
function initRoleSwitcher() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const workspaceViews = document.querySelectorAll('.workspace-view');
    const tilesContainers = document.querySelectorAll('.tiles-container');
    
    // User data for each role
    const userData = {
        student: {
            name: 'John Doe',
            firstName: 'John',
            role: 'Student',
            subtext: "Here's what's happening today"
        },
        staff: {
            name: 'Dr. Sarah Smith',
            firstName: 'Sarah',
            role: 'Academic Staff',
            subtext: 'Your teaching overview for today'
        },
        admin: {
            name: 'Admin User',
            firstName: 'Admin',
            role: 'Administrator',
            subtext: 'System status and management'
        }
    };
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Update button states
            roleButtons.forEach(btn => {
                btn.classList.remove('bg-wiut-teal', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-600');
            });
            this.classList.remove('bg-gray-200', 'text-gray-600');
            this.classList.add('bg-wiut-teal', 'text-white');
            
            // Switch workspace views
            workspaceViews.forEach(view => {
                if (view.dataset.view === role) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            });
            
            // Switch tiles
            tilesContainers.forEach(tiles => {
                if (tiles.dataset.tiles === role) {
                    tiles.classList.remove('hidden');
                } else {
                    tiles.classList.add('hidden');
                }
            });
            
            // Update user info in header
            const user = userData[role];
            const userNameEl = document.getElementById('userName');
            const userRoleEl = document.getElementById('userRole');
            const greetingNameEl = document.getElementById('greetingName');
            const greetingSubtextEl = document.getElementById('greetingSubtext');
            
            if (userNameEl) userNameEl.textContent = user.name;
            if (userRoleEl) userRoleEl.textContent = user.role;
            if (greetingNameEl) greetingNameEl.textContent = user.firstName;
            if (greetingSubtextEl) greetingSubtextEl.textContent = user.subtext;
            
            // Re-initialize icons after DOM update
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const menuButton = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between menu and X
            const icon = menuButton.querySelector('[data-lucide]');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// ============================================
// Expandable Cards
// ============================================
function initExpandableCards() {
    const expandButtons = document.querySelectorAll('.expandable-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const card = this.closest('.workspace-card');
            
            if (card) {
                card.classList.toggle('expanded');
                
                // Update button text
                const isExpanded = card.classList.contains('expanded');
                const originalText = this.textContent;
                
                if (isExpanded) {
                    this.textContent = originalText.replace('View', 'Hide').replace('→', '↑');
                } else {
                    this.textContent = originalText.replace('Hide', 'View').replace('↑', '→');
                }
            }
        });
    });
}

// ============================================
// Lazy Loading Simulation (Performance Demo)
// ============================================
function simulateLazyLoad(element, delay = 500) {
    element.classList.add('skeleton');
    
    setTimeout(() => {
        element.classList.remove('skeleton');
    }, delay);
}

// ============================================
// Quick Action Handlers
// ============================================
document.querySelectorAll('.quick-action-btn').forEach(button => {
    button.addEventListener('click', function() {
        const actionText = this.querySelector('span').textContent;
        
        // Demo: Show a simple notification
        showNotification(`Opening: ${actionText}...`);
    });
});

// ============================================
// Simple Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.winet-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'winet-notification fixed bottom-4 right-4 bg-wiut-blue text-white px-6 py-3 rounded-xl shadow-lg z-50 transform translate-y-0 opacity-100 transition-all duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// Tile Click Handlers
// ============================================
document.querySelectorAll('.tile-card').forEach(tile => {
    tile.addEventListener('click', function(e) {
        e.preventDefault();
        const tileName = this.querySelector('h4').textContent;
        showNotification(`Navigating to ${tileName}...`);
    });
});

// ============================================
// Announcement Toggle
// ============================================
const toggleAnnouncements = document.getElementById('toggleAnnouncements');
if (toggleAnnouncements) {
    toggleAnnouncements.addEventListener('click', function() {
        showNotification('Opening announcements...');
    });
}

// ============================================
// Keyboard Navigation Enhancement
// ============================================
document.addEventListener('keydown', function(e) {
    // Press 'S' to focus search (when not in input)
    if (e.key === 's' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        const searchBtn = document.querySelector('button[title="Search"]');
        if (searchBtn) {
            searchBtn.focus();
            showNotification('Search: Press Enter to open');
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

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
                <p class="text-xs text-gray-400 mt-1 mr-2">Just now</p>
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
                    <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100">
                        <p class="text-gray-700 text-sm">${responses[Math.floor(Math.random() * responses.length)]}</p>
                    </div>
                    <p class="text-xs text-gray-400 mt-1 ml-2">Just now</p>
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
// Console Welcome Message
// ============================================
console.log('%cWINET - WIUT Intranet', 'color: #264F9D; font-size: 20px; font-weight: bold;');
console.log('%cFrontend Prototype v2.0', 'color: #358A7C; font-size: 12px;');
console.log('%cDeveloped for Westminster International University in Tashkent', 'color: #6b7280; font-size: 11px;');
