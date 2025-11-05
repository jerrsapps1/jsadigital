# JSA (Job Safety Analysis) SaaS MVP

## Project Overview

Production-grade JSA (Job Safety Analysis) SaaS application that digitizes safety forms for field crews in the construction industry. Features professional printable/PDF export with consistent layout, role-based authentication, and analytics dashboard.

## Current Status

**Completed Features:**
- ✅ Full frontend prototype with OSHA-themed dark design and glassmorphic effects
- ✅ Professional printable JSA layout (Letter/A4 format)
- ✅ Server-side PDF generation using Puppeteer
- ✅ Pre-seeded construction templates (8 common activities)
- ✅ Universal PPE standards
- ✅ Sample JSA documents
- ✅ Multi-page PDF support with continuation sheets
- ✅ Signature blocks for digital sign-offs
- ✅ Templates library page

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Wouter (routing)
- TanStack Query v5 (data fetching)
- shadcn/ui + Tailwind CSS (UI components)
- Recharts (analytics charts)
- signature_pad (digital signatures)
- date-fns (date formatting)

### Backend
- Node.js + Express
- TypeScript
- Puppeteer (PDF generation)
- In-memory storage (MemStorage)

### Styling
- OSHA-inspired GitHub dark theme (#0d1117 background)
- Glassmorphic cards with blue glow effects
- OSHA orange primary color (#f97316)
- Professional print CSS for JSA documents

## Project Structure

```
/
├── client/src/
│   ├── components/
│   │   ├── AppSidebar.tsx          # Navigation sidebar
│   │   ├── DashboardPage.tsx       # Main dashboard
│   │   ├── JsaBuilder.tsx          # JSA creation wizard
│   │   ├── JsaViewPage.tsx         # JSA view/print/PDF page
│   │   ├── PrintableJSA_Alamo.tsx  # Printable JSA component
│   │   ├── TemplatesPage.tsx       # Construction templates library
│   │   ├── ArchivePage.tsx         # JSA archive/history
│   │   ├── AnalyticsPage.tsx       # Safety analytics dashboard
│   │   ├── SignaturePad.tsx        # Digital signature component
│   │   ├── KpiCard.tsx             # KPI metric cards
│   │   ├── TrendChart.tsx          # Chart components
│   │   └── ui/                     # shadcn components
│   ├── pages/
│   │   └── not-found.tsx
│   ├── App.tsx                     # Main app with routing
│   └── index.css                   # Global styles + print CSS
├── server/
│   ├── api/
│   │   └── jsaAlamoPdf.ts          # PDF generation API
│   ├── templates/
│   │   └── alamo-print.css         # Print stylesheet
│   ├── routes.ts                   # API routes
│   └── storage.ts                  # In-memory storage
├── shared/
│   ├── jsaAlamoTypes.ts            # JSA document types
│   ├── ppeStandards.ts             # Universal PPE standards
│   ├── templates.construction.ts  # Construction templates
│   └── jsa.sample.concrete.ts     # Sample concrete JSA
└── package.json
```

## Construction Templates (Pre-seeded)

1. **Excavation & Trenching (≤ 15 ft)** - 6 steps covering utility locates, cave-in prevention, access/egress
2. **Scaffolding (Erection/Use/Dismantle)** - 6 steps for safe scaffold operations
3. **Roof Work / Fall Protection** - 6 steps for working at heights
4. **Concrete Pour & Formwork** - 6 steps for concrete operations
5. **Electrical LOTO (Construction)** - 6 steps for lockout/tagout procedures
6. **Crane / Rigging & Lifting** - 6 steps for crane operations
7. **Hot Work (Cutting/Welding)** - 6 steps for welding safety
8. **General Housekeeping / Material Handling** - 6 steps for site maintenance
9. **Steel Erection** - 6 steps for structural steel assembly
10. **Confined Space Entry** - 6 steps for permit-required confined spaces
11. **Roadway Traffic Control** - 6 steps for work zone safety
12. **Drywall & Framing** - 6 steps for interior construction
13. **MEP Rough-In (Mechanical/Electrical/Plumbing)** - 6 steps for systems installation

## Universal PPE Standards

All JSAs include these standard PPE requirements:
- Hard hat, safety glasses with side shields, high-visibility vest
- Work gloves appropriate for task; cut-resistant when handling sharp materials
- Safety footwear (ASTM F2413) with slip-resistant soles
- Hearing protection where noise >85 dBA
- Respiratory protection (fit-tested and trained)
- Fall protection when working at heights
- Task-specific PPE as indicated by JSA
- All PPE inspected prior to use

## Key Routes

- `/` - Dashboard (redirects to `/dashboard`)
- `/dashboard` - Main dashboard with KPIs and recent JSAs
- `/jsas/new` - Create new JSA (5-step wizard)
- `/jsas/:id` - View JSA with Print and PDF buttons
- `/templates` - Templates library
- `/archive` - JSA archive/history
- `/analytics` - Safety analytics dashboard

## API Endpoints

- `POST /api/jsas/:id/pdf` - Generate PDF from JSA document
  - Body: JsaAlamoDoc JSON
  - Returns: application/pdf

- `GET /api/jsas/:id/suggest?template={templateName}` - AI suggestion endpoint
  - Query: template name (e.g., "Confined Space Entry")
  - Returns: JSON with hazards, controls, PPE, UI toggles, and special field defaults
  - Example response:
    ```json
    {
      "hazards": [{"stepOrder": 1, "type": "Oxygen Deficiency", "details": "..."}],
      "controls": [{"hazardType": "...", "type": "Engineering", "details": "..."}],
      "ppe": ["Hard Hat", "Safety Glasses", ...],
      "uiToggles": {
        "confinedSpace": true,
        "atmosphericMonitoring": true,
        "hotWorkPermit": false,
        "loto": false,
        "craneLiftPlan": false,
        "trafficControlPlan": false
      },
      "special": {
        "confinedSpace": {
          "requiresPermit": true,
          "atmosphericMonitoring": { ... }
        }
      }
    }
    ```

## PDF Generation

The system supports two print methods:

1. **Browser Print** (Ctrl+P / Cmd+P)
   - Uses print CSS from index.css
   - Letter/A4 page size, 12mm margins
   - Hides UI elements with `.no-print` class
   
2. **Server-generated PDF**
   - POST to `/api/jsas/:id/pdf` with JSA document
   - Puppeteer renders identical HTML structure
   - Returns PDF blob for download/viewing

Both methods produce identical output using the same layout and styles.

## Multi-role Collaboration (Future)

Role types defined:
- ADMIN - Full system access
- SUPERVISOR - Create/edit JSAs, manage team
- WORKER - View/sign JSAs
- EHS - Safety oversight, analytics access
- PM - Project manager, approvals

## Special Fields System

The application supports task-specific permit and control systems that auto-populate based on template selection:

### Confined Space
- Permit number and attendant tracking
- Atmospheric monitoring (O2, LEL, H2S, CO)
- Acceptable ranges and actual readings
- Continuous monitoring requirements
- Ventilation CFM requirements
- Isolation verification

### Hot Work
- Permit requirement tracking
- Fire watch duration (default: 60 minutes)

### LOTO (Lockout/Tagout)
- Energy isolation requirements

### Crane/Lift
- Lift plan requirements

### Traffic Control
- Traffic Control Plan (TCP) requirements

These fields are automatically suggested via the `/api/jsas/:id/suggest` endpoint and render as separate permit pages in the PDF output.

## Future Enhancements

- [ ] Database integration (replace in-memory storage)
- [ ] Multi-role authentication and permissions
- [✅] AI-powered hazard/control suggestions (`/api/jsas/:id/suggest`) - **COMPLETED**
- [✅] Special fields system for permits and controls - **COMPLETED**
- [ ] JSA Builder UI integration with special fields
- [ ] QR codes linking PDFs to live JSAs
- [ ] Audit trail footer with timestamps
- [ ] Real-time collaboration
- [ ] Mobile app for field workers
- [ ] Organization branding (logos, colors)
- [ ] Template customization per organization
- [ ] Weather data integration
- [ ] GPS-based job site verification

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (frontend + backend)
npm run dev

# Build for production
npm run build
```

## Environment Variables

- `SESSION_SECRET` - Session encryption key (already configured)
- `NODE_ENV` - Environment (development/production)

## Design Guidelines

The application uses a dark OSHA safety theme:
- Background: #0d1117 (deep charcoal)
- Primary: #f97316 (OSHA orange)
- Accent: #10b981 (emerald green)
- Cards: Semi-transparent with 12px blur, blue glow shadows
- Typography: Inter font family
- All interactive elements have glassmorphic effects

## Recent Changes (2025-11-05)

**Phase 1 - Foundation:**
1. Added professional printable JSA layout system
2. Implemented server-side PDF generation with Puppeteer
3. Pre-seeded 8 construction templates
4. Created universal PPE standards
5. Added Templates library page
6. Updated sample JSA to concrete pour (from asbestos)
7. Fixed pagination to render all job steps (not just first 6)
8. Integrated print CSS into main stylesheet

**Phase 2 - Expansion (Today):**
1. ✅ Added 5 additional construction templates (Steel Erection, Confined Space Entry, Roadway Traffic Control, Drywall & Framing, MEP Rough-In)
2. ✅ Implemented special fields system in JsaAlamoDoc type
3. ✅ Created AI suggestion endpoint `/api/jsas/:id/suggest`
4. ✅ Auto-toggle system for task-specific controls (confined space, hot work, LOTO, crane lift, traffic control)
5. ✅ PrintableJSA_Alamo now renders special permit pages (Confined Space Permit, Hot Work Permit, LOTO, etc.)
6. ✅ Created sample JSA with confined space monitoring data
7. ✅ Total templates: 13 (up from 8)

## Notes

- Currently using in-memory storage (data resets on server restart)
- No database seed script needed - templates available in shared/ directory
- All templates follow OSHA safety guidelines
- PDF generation requires Puppeteer (already installed)
- Print CSS supports both Letter and A4 paper sizes
