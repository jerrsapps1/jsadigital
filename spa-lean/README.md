# JSA SPA Lean

Lightweight 2-step JSA builder using only React + Vite. No backend, no database—just templates, local JSON import/export, and printable PDFs.

## Features

- 📋 **13 Construction Templates** - Shared with main app from `/shared/seeds/templates.ts`
- 🎯 **2-Step Workflow** - Templates page → Builder page → Print
- 💾 **Local Storage** - Export/Import JSAs as JSON files
- 🖨️ **Print to PDF** - Browser's native print functionality
- 📦 **Shared Types** - Uses types from `/shared/types.ts`
- 🎨 **Printable Layout** - Uses `PrintableJSA_Alamo` component from `/shared/components`

## Getting Started

```bash
cd spa-lean
npm install
npm run dev
```

Visit http://localhost:5173

## Monorepo Structure

```
/shared                   # Shared source of truth
├─ types.ts              # JsaAlamoDoc, JsaTemplateRow types
├─ seeds/
│  ├─ templates.ts       # 13 construction templates
│  └─ ppe.ts             # Universal PPE standards
└─ components/
   └─ PrintableJSA_Alamo.tsx  # Print layout component

/spa-lean                # This app
├─ src/
│  ├─ pages/
│  │  ├─ TemplatesPage.tsx
│  │  └─ BuilderPage.tsx
│  ├─ utils/
│  │  └─ local.ts        # JSON export/import helpers
│  └─ styles/
│     └─ print.css       # Print-specific styles
└─ vite.config.ts        # Configured to import from ../shared
```

## Differences from Full App (`/app`)

| Feature | Full App | SPA Lean |
|---------|----------|----------|
| Backend | Express + API | None |
| Database | In-memory storage | None |
| Voice Commands | Yes | No |
| AI Suggestions | Yes | No |
| Special Fields | Yes | No |
| Persistence | In-memory | JSON files only |

## Tech Stack

React 19 + React Router 7 + Vite 7 + TypeScript
