# JSA SaaS Design Guidelines

## Design Approach

**Selected Approach**: Design System - Material Design 3 with Linear-inspired refinements

**Justification**: This enterprise SaaS tool prioritizes functionality, data clarity, and trust. Material Design 3 provides robust form components and data visualization patterns, while Linear's aesthetic brings modern polish to enterprise software. This combination ensures professional credibility essential for safety compliance tools.

**Core Principles**:
- Clarity over decoration - information must be instantly scannable
- Trustworthy professionalism - this handles safety compliance
- Efficient workflows - minimize clicks for field crews
- Mobile-first forms - crews work on tablets/phones in the field

---

## Typography System

**Font Families**:
- Primary: Inter (via Google Fonts) - body text, forms, data tables
- Display: Inter (600-700 weight) - headings, page titles
- Monospace: JetBrains Mono - timestamps, IDs, technical data

**Hierarchy**:
- Page Titles: text-3xl font-semibold tracking-tight
- Section Headers: text-xl font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base font-normal
- Labels: text-sm font-medium uppercase tracking-wide text-muted-foreground
- Helper Text: text-sm text-muted-foreground
- Data Tables: text-sm for optimal density

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (component internals): 2, 4
- Standard spacing (between elements): 6, 8
- Section spacing: 12, 16

**Container Strategy**:
- Dashboard/App Shell: max-w-7xl mx-auto
- Form Content: max-w-3xl
- Full-width Data Tables: w-full with responsive scroll
- Sidebar Navigation: fixed w-64 on desktop, slide-over on mobile

**Grid Patterns**:
- Dashboard KPI Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- JSA Archive: Single column with full-width data table
- Settings Panels: Two-column layout (navigation + content)

---

## Component Library

### Navigation & Layout

**App Shell**:
- Fixed sidebar navigation (desktop) with org logo, main nav, user dropdown
- Top bar (mobile) with hamburger menu and context (current project/JSA title)
- Breadcrumb trail on all pages below top bar
- Persistent "Create JSA" floating action button (bottom-right on mobile)

**Sidebar Navigation**:
- Org logo at top with brand color accent
- Icon + label navigation items with active state indicator (left border + background tint)
- Role badge showing current user role
- Org switcher dropdown at bottom

### Forms & Data Entry

**JSA Builder (Multi-Step Form)**:
- Stepper indicator showing: 1. Details → 2. Steps → 3. Hazards → 4. Controls → 5. Review
- Each step in full-height card with generous padding (p-8)
- Progress auto-saved indicator (top-right, small text with checkmark icon)
- Action buttons: "Save Draft" (secondary) + "Continue" (primary) anchored bottom-right

**Job Step Entry**:
- Repeatable card pattern with drag handles for reordering
- Each step card contains: step number badge, description textarea, delete icon-button
- "+ Add Step" button below cards (outlined style)

**Form Inputs**:
- Floating labels for all text inputs
- Helper text below inputs in muted color
- Error states with red left border and error message
- Select dropdowns with search for project selection
- Date/time pickers with calendar icon

### Signature Capture

**Signature Panel**:
- Full-width white canvas with thin border
- Controls below: "Clear" (text button) + "Confirm" (primary button)
- After signing: show preview thumbnail + name label + timestamp + GPS coordinates (if captured)
- Multiple signature slots in vertical stack: Supervisor → Worker 1 → Worker 2 (expandable)

### Data Display

**Data Tables**:
- Sticky header row with sort indicators
- Row hover state with subtle background
- Status badges (Draft: gray, Pending: yellow, Complete: green) with dot prefix
- Action column (right-aligned) with icon buttons (view, download PDF, archive)
- Pagination controls at bottom
- Search/filter bar above table with date range picker

**KPI Cards** (Dashboard):
- White card with subtle shadow
- Large metric number (text-4xl font-bold)
- Label below in muted text
- Small trend indicator (up/down arrow + percentage)
- Optional icon in top-right corner with brand color tint

**Charts** (Analytics):
- Bar chart for JSAs by project (horizontal bars with rounded corners)
- Pie chart for top hazards (brand color palette)
- Line chart for JSAs over time
- All charts with legend below, axis labels, and tooltip on hover

### Action Components

**Buttons**:
- Primary: filled with brand color (or blue-600 default), white text, rounded-lg
- Secondary: outlined with border-2, rounded-lg
- Destructive: red-600 fill for delete actions
- Icon-only buttons: square aspect ratio, p-2, hover background

**Floating Action Button**:
- Large circular button (w-14 h-14) with shadow-lg
- Fixed position bottom-right (bottom-6 right-6)
- Brand color background, white plus icon
- Visible on archive and dashboard pages

### Status & Feedback

**Status Workflow Indicator**:
- Horizontal stepper showing Draft → Pending Sign-off → Complete
- Completed steps: brand color with checkmark
- Current step: brand color outline
- Future steps: gray outline

**Toast Notifications**:
- Top-right position, slide-in animation
- Success (green), Error (red), Info (blue) variants
- Auto-dismiss after 5 seconds with progress bar

---

## Page-Specific Layouts

**Dashboard**:
- KPI cards in 4-column grid at top
- Recent JSAs table below (max 5 rows with "View All" link)
- Quick actions card on right sidebar (Create JSA, View Templates)

**JSA Builder**:
- Full-width centered form (max-w-3xl)
- Sticky header with JSA title + auto-save status
- Form sections in vertical flow with generous spacing (space-y-12)

**Archive**:
- Search bar with filters (project dropdown, date range, status checkboxes) in collapsible panel
- Full-width data table with horizontal scroll on mobile
- Bulk actions toolbar appears when rows selected

**Analytics**:
- Summary metrics in card grid at top
- Charts in 2-column grid below
- Export button (top-right) to download reports

**Settings**:
- Left sidebar with setting categories (General, Branding, Users, Billing)
- Right content area (max-w-3xl) with forms for selected category
- Branding section: logo upload with preview, brand color picker with live preview swatch

---

## Images

**Org Logo**: Used in sidebar navigation (max height h-8) and PDF exports. Admin uploads via Settings → Branding. Shows placeholder box with "Upload Logo" text when not set.

**Signature Images**: Captured via signature pad canvas, displayed as thumbnail previews (h-16) in signature confirmation and PDF exports.

**No Hero Images**: This is a functional SaaS application - no marketing hero sections. Login page features centered card with logo + form only.

---

## Mobile Considerations

- All data tables scroll horizontally with sticky first column
- Sidebar collapses to hamburger menu
- KPI cards stack to single column
- Form inputs use native mobile controls (date pickers, select dropdowns)
- Signature pad optimized for touch with larger tap targets