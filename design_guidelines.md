# JSA Safety Platform - Design Guidelines

## Design Philosophy
The JSA Safety Platform features a GitHub-inspired dark theme with glassmorphic elements and blue glow effects, creating a sophisticated, modern, and trustworthy appearance perfect for professional safety management.

## Color System

### Brand Colors (OSHA-Inspired)
- **Primary Color**: #f97316 (OSHA Orange)
  - Used for main action buttons (Create JSA, Save), OSHA badges, key highlights, primary CTAs
  - Purpose: Draws attention to important actions and safety-specific elements

- **Secondary Color**: #2f81f7 (AI Blue)
  - Used for links, secondary buttons, technical features
  - Purpose: Distinguishes technical features and navigation elements

- **Accent Color**: #10b981 (Emerald Green)
  - Used for active navigation items, highlights, focus indicators, selected states
  - Purpose: Shows what's currently active or selected

### Status Colors
- **Success**: #22c55e (Green) - Completed tasks, success confirmations
- **Warning**: #f59e0b (Amber) - Caution alerts, pending items
- **Error**: #ef4444 (Red) - Error messages, critical alerts

### Core UI Colors (GitHub-Inspired Dark Theme)
- **Main Background**: #0d1117 (Deep charcoal)
- **Canvas/Surface**: #161b22 (Slightly lighter charcoal)
- **Text Primary**: #c9d1d9 (Light gray - high readability)
- **Text Muted**: #8b949e (Medium gray - secondary information)
- **Default Borders**: #30363d (Subtle gray)

## Visual Effects

### Glassmorphic Cards
All cards feature:
- Semi-transparent background: rgba(22, 27, 34, 0.85)
- Backdrop filter: 16px blur for frosted glass effect
- Border: Semi-transparent white (rgba(255, 255, 255, 0.08))
- Blue glow shadow: rgba(88, 166, 255, 0.15) for ethereal depth
- Enhanced hover state with increased glow
- Applied via `.glass-card` class

### Radial Gradient Background
Multi-layered atmospheric gradient:
- Blue glow from top center (AI Blue)
- Emerald accent from bottom left
- Orange hint from right side
- Creates sophisticated depth across the application

### Interactive States
- **Hover**: Subtle elevation with brightness increase and enhanced blue glow
- **Active**: Enhanced elevation for pressed feeling
- **Focus**: Uses accent color (emerald) for accessibility

## Typography

### Font Families
- **Sans-Serif (Body)**: Inter, -apple-system, BlinkMacSystemFont
  - Clean, modern, highly readable
  - Used for all standard UI text

- **Monospace (Technical)**: JetBrains Mono
  - Technical, precise appearance
  - Used for dates, codes, technical data

- **Serif (Optional)**: Georgia
  - Traditional, formal feel
  - Available for headings if needed

### Text Hierarchy
Three levels of text color:
1. **Primary**: Full brightness (#c9d1d9) for main content
2. **Muted**: Medium gray (#8b949e) for supporting details
3. **Tertiary**: Most subtle for least important info

## Layout & Spacing

### Border Radius
- **Standard**: 0.5rem (8px) for all elements
- Philosophy: Small, subtle rounding for modern feel

### Spacing Scale
- **Base unit**: 0.25rem (4px)
- Consistent spacing throughout for visual harmony

### Container Strategy
- Dashboard/App Shell: Full-width with 1.5rem padding
- Form Content: max-w-3xl mx-auto
- Full-width Data Tables: w-full with responsive scroll
- Sidebar Navigation: 16rem width on desktop

## Component Library

### Navigation & Layout

**App Shell**:
- Fixed sidebar navigation with org branding and main nav
- Top header with sidebar toggle
- Main content area with page-specific content
- Dark mode by default (no toggle)

**Sidebar Navigation**:
- Glassmorphic background matching theme
- Icon + label navigation items with active state (emerald accent)
- Role badge showing current user role
- Compact, modern layout

### Forms & Data Entry

**JSA Builder (Multi-Step Form)**:
- Stepper indicator showing: 1. Details → 2. Job Steps → 3. Hazards → 4. Controls → 5. Review
- Each step in glassmorphic card with generous padding
- Progress auto-saved indicator (top-right, emerald badge)
- Action buttons: "Save Draft" + "Continue" or "Submit for Sign-off"

**Job Step Entry**:
- Repeatable glassmorphic card pattern with drag handles
- Each step card: step number badge, description textarea, delete button
- "+ Add Step" button below cards

**Form Inputs**:
- Dark-themed inputs with subtle borders
- Labels with muted text color
- Error states with red accent
- Dropdowns with dark popover backgrounds

### Signature Capture

**Signature Panel**:
- White canvas with border for signature capture
- Controls: "Clear" + "Confirm" buttons
- Preview thumbnails after signing
- Signature display with name, timestamp, GPS

### Data Display

**Data Tables**:
- Glassmorphic container with blue glow
- Semi-transparent header background
- Sortable columns with hover states
- Status badges (Draft: muted, Pending: warning, Complete: success)
- Row hover elevation with blue glow
- Action buttons (view, download PDF)

**KPI Cards**:
- Glassmorphic cards with blue glow
- Large metric number (text-4xl font-bold)
- Label in muted text with uppercase tracking
- Trend indicator (emerald for positive, red for negative)
- Icon in top-right with primary color tint

**Charts** (Analytics):
- Glassmorphic card containers
- Bar charts with OSHA orange primary color
- Pie charts with theme color palette
- Dark-themed tooltips and legends

### Action Components

**Buttons**:
- Primary: OSHA orange fill, white text, rounded-md
- Secondary: AI blue fill, white text, rounded-md
- Outline: Semi-transparent with border, hover elevation
- Ghost: Transparent, subtle hover state
- Icon-only: Square with hover elevation

**Status Badges**:
- Draft: Muted gray background
- Pending Sign-off: Warning amber background
- Complete: Success green background
- Small, compact size with rounded corners

### Status & Feedback

**Toast Notifications**:
- Dark glassmorphic background
- Success (green), Error (red), Info (blue) variants
- Auto-dismiss with smooth animations

## Page-Specific Layouts

**Login**:
- Centered glassmorphic card on gradient background
- Large safety icon at top
- Clean, minimal form layout

**Dashboard**:
- KPI cards in responsive grid (1/2/4 columns)
- Recent JSAs table with glassmorphic container
- Quick actions and system status cards

**JSA Builder**:
- Centered form (max-w-3xl)
- Step indicator at top
- Glassmorphic form sections
- Navigation buttons at bottom

**Archive**:
- Search bar with collapsible filters
- Full-width data table
- Glassmorphic filter panel

**Analytics**:
- Summary KPI cards at top
- Charts in 2-column grid
- All glassmorphic containers

## Design Principles

1. **Contrast**: High contrast text on dark backgrounds for readability
2. **Consistency**: Repeated glassmorphic pattern throughout
3. **Depth**: Blue glow effects and shadows create visual layers
4. **Focus**: OSHA orange draws eyes to key safety actions
5. **Trust**: GitHub-inspired dark theme feels professional and modern
6. **Accessibility**: Clear focus states and color contrast ratios

## Implementation Notes

- Dark mode is always active (no toggle needed)
- All cards use the `.glass-card` class for consistent styling
- Blue glow effects applied via custom shadow variables
- Radial gradient is applied to body background
- Use semantic color variables from Tailwind config (hsl(var(--primary)), etc.)
- OSHA orange (#f97316) is the primary brand color for all CTAs
- Emerald green (#10b981) indicates active/selected states
- AI blue (#2f81f7) for secondary actions and links
