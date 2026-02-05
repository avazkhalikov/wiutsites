# WINET - WIUT Intranet Homepage Prototype

A modern, hybrid homepage redesign for Westminster International University in Tashkent (WIUT) Intranet.

## Overview

This prototype demonstrates a **hybrid approach** that combines:
- **Intelligent Workspace Zone**: Role-based cards showing personalized, actionable information
- **Essential Tiles Section**: Familiar tile-based access to 4-6 key systems
- **Performance-First Design**: Lightweight, fast-loading interface

## Features

### Role-Based Experience
Switch between three user roles to see different views:
- **Student**: Timetable, deadlines, attendance, grades
- **Staff**: Teaching schedule, pending actions, module management
- **Admin**: System status, management portals, recent activity

### Design Principles
- ✅ WIUT Brand Colors (#264F9D, #C7293F, #4DACE1, #F6AC10, #358A7C)
- ✅ TT Wellington-inspired typography (Plus Jakarta Sans fallback)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Accessibility-focused (keyboard navigation, focus states)
- ✅ Performance-optimized (no heavy charts/analytics)

## File Structure

```
winet-homepage/
├── index.html          # Main homepage HTML
├── css/
│   └── styles.css      # Custom styles & WIUT brand tokens
├── js/
│   └── app.js          # Role switcher & interactions
└── README.md           # This file
```

## How to View

1. Open `index.html` in any modern web browser
2. Use the **Role Switcher** (Demo Mode bar) to switch between Student/Staff/Admin views
3. Interact with cards, tiles, and quick actions

## Technologies Used

- **Tailwind CSS** (via CDN) - Utility-first styling
- **Lucide Icons** - Modern icon library
- **Vanilla JavaScript** - No framework dependencies
- **Plus Jakarta Sans** - Web font (TT Wellington substitute)

## Loading Strategy

| Phase | Content | Method |
|-------|---------|--------|
| Instant | HTML shell, layout | Static HTML |
| Fast (<100ms) | User info, cards | Embedded |
| Deferred | Details, expanded content | On interaction |

## Extensibility

- **Add new services**: Create new tile cards in the tiles section
- **Add new roles**: Extend the `userData` object in `app.js`
- **Add new cards**: Follow the workspace-card pattern in HTML
- **Theming**: Modify CSS custom properties in `:root`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Credits

- Design: Based on [WIUT Brandbook 2023](https://intranet.wiut.uz/content/documents/WIUT%20Brandbook%2017-01-2023.pdf)
- Parent Institution: [University of Westminster, UK](https://www.westminster.ac.uk)

---

© 2026 Westminster International University in Tashkent. WINET v2.0 Prototype.
