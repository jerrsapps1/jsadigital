# JSA (Job Safety Analysis) SaaS MVP

## Overview

This project is a production-grade SaaS application for Job Safety Analysis (JSA) in the construction industry. It digitizes safety forms, offers professional printable/PDF exports, includes role-based authentication, and provides an analytics dashboard. The core purpose is to streamline safety compliance for field crews by offering an intuitive platform for creating, managing, and signing off on JSA documents. The application features an OSHA-themed dark design and incorporates AI-powered suggestions for hazards and controls.

## User Preferences

I prefer concise, direct answers.
Focus on practical, actionable steps.
Prioritize core functionalities over minor details.
Use clear and unambiguous language.
Assume a good understanding of web development concepts.
Do not make changes to the `/spa-lean` folder unless explicitly instructed.
Before implementing major changes, propose the approach and await approval.
I prefer an iterative development approach with frequent, small commits.

## System Architecture

The project is structured as a monorepo, sharing types, templates, and components across two main applications:

-   **`/app`**: The full-featured SaaS application with a backend, AI integration, and voice commands.
-   **`/spa-lean`**: A lightweight, client-only application focused on quick JSA creation and offline capability, with JSON import/export.

Both applications leverage a shared `/shared` directory for common resources, ensuring consistency and reusability.

### Frontend
-   **Technology**: React 18 with TypeScript, Vite, Wouter for routing, TanStack Query v5 for data fetching.
-   **UI/UX**: shadcn/ui and Tailwind CSS for components. The design is OSHA-inspired with a dark theme (#0d1117 background, #f97316 primary, #10b981 accent), glassmorphic cards, and Inter font family.
-   **Key Features**: Dashboard, JSA Builder with a wizard, JSA view/print/PDF pages, Templates library, Archive, Analytics dashboard, and a voice command system for hands-free interaction.
-   **PDF Generation**: Browser print (Ctrl+P/Cmd+P) and server-generated PDFs produce identical, professional-grade outputs with consistent Letter/A4 layouts.

### Backend
-   **Technology**: Node.js with Express and TypeScript.
-   **Data Storage**: In-memory storage (MemStorage) for the `/app` by default.
-   **Core Functionality**: Handles API endpoints, including server-side PDF generation using Puppeteer and AI-powered suggestions for JSA content.

### Feature Specifications
-   **Construction Templates**: 13 pre-seeded OSHA-compliant templates for common construction activities (e.g., Excavation, Hot Work, Confined Space Entry).
-   **Universal PPE Standards**: Standardized PPE requirements included in all JSAs.
-   **Special Fields System**: Task-specific permit and control systems (Confined Space, Hot Work, LOTO, Crane/Lift, Traffic Control) that auto-populate and render as separate permit pages in PDF outputs. Validation middleware ensures compliance.
-   **AI Suggestions**: An API endpoint (`/api/jsas/:id/suggest`) provides AI-driven recommendations for hazards, controls, PPE, and automatically toggles special fields based on the selected template.
-   **Voice Commands**: Supports hands-free JSA creation and template selection via Web Speech API, with a regex-based NLU for intent parsing.

## External Dependencies

-   **Puppeteer**: Used on the backend for server-side PDF generation.
-   **Recharts**: For rendering analytics charts on the frontend.
-   **signature_pad**: For digital signature capture.
-   **date-fns**: For date formatting utilities.
-   **Web Speech API**: Utilized for voice command recognition in modern browsers.