# Construction Safety Templates

This document provides quick reference for the 8 pre-seeded construction JSA templates included in the application.

## Template Overview

All templates follow OSHA safety guidelines and include:
- 6 job steps with hazards and procedures
- Universal PPE standards (automatically included)
- Safety notes and special considerations
- Ready-to-use format for field crews

---

## 1. Excavation & Trenching (≤ 15 ft)

**Steps:**
1. Pre-task plan & utility locates
2. Excavation start
3. Access/egress
4. Work in trench
5. Backfilling/compaction
6. Demobilize/restore site

**Key Hazards:** Cave-in, underground utilities, struck-by, atmospheric hazards, engulfment

**Safety Notes:**
- Follow soil classification requirements
- Stop work on water intrusion or fissures

---

## 2. Scaffolding (Erection/Use/Dismantle)

**Steps:**
1. Deliver materials & set base
2. Frame/brace install
3. Decking/guardrails
4. Access
5. Use phase
6. Dismantle

**Key Hazards:** Falls, dropped objects, unstable base, overloading, collapse

---

## 3. Roof Work / Fall Protection

**Steps:**
1. Access roof
2. Set fall protection
3. Material staging
4. Perform task
5. Weather monitoring
6. Demob

**Key Hazards:** Falls from height, ladder accidents, edge exposure, weather conditions

---

## 4. Concrete Pour & Formwork

**Steps:**
1. Formwork inspection
2. Pump/buggy setup
3. Pour concrete
4. Vibrate/finish
5. Cure/protect
6. Strip formwork

**Key Hazards:** Formwork collapse, impalement, hose whip, chemical irritation, struck-by

**Sample JSA:** Available at `/jsas/seed-jsa-concrete-001`

---

## 5. Electrical LOTO (Construction)

**Steps:**
1. Identify energy sources
2. Shut down & isolate
3. Apply locks/tags
4. Verify zero energy
5. Perform work
6. Remove LOTO/restore

**Key Hazards:** Arc flash, electrical shock, stored energy, unexpected energization

---

## 6. Crane / Rigging & Lifting

**Steps:**
1. Lift plan & communication
2. Inspect crane/rigging
3. Setup & outriggers
4. Test pick
5. Perform lift
6. Landing & demob

**Key Hazards:** Load drop, struck-by, tip-over, power line contact, unbalanced loads

---

## 7. Hot Work (Cutting/Welding)

**Steps:**
1. Permit & area prep
2. Set equipment
3. Perform hot work
4. Post-work fire watch
5. Cylinder handling
6. Housekeeping

**Key Hazards:** Fire, explosion, gas leaks, radiant heat, eye injury, smoldering fires

---

## 8. General Housekeeping / Material Handling

**Steps:**
1. Staging materials
2. Manual handling
3. Powered equipment
4. Waste removal
5. Daily cleanup
6. Storage

**Key Hazards:** Trips/slips, strains, struck-by, blocked egress, chemical incompatibility

---

## Universal PPE Standards

These standards are included in ALL JSAs:

1. Hard hat, safety glasses with side shields, high-visibility vest
2. Work gloves appropriate for task; cut-resistant when handling sharp materials
3. Safety footwear (ASTM F2413) with slip-resistant soles
4. Hearing protection where noise >85 dBA (follow posted signage / monitoring)
5. Respiratory protection only if required by task and worker is fit-tested and trained
6. Fall protection when working at heights per local/OSHA rules
7. Task-specific PPE: face shields, welding hood, arc-rated PPE, chemical-resistant gloves/aprons
8. All PPE inspected prior to use; defective PPE removed from service

---

## Using Templates

### In the Application

1. Navigate to **Templates** page (`/templates`)
2. Browse available templates
3. Click **"Use This Template"** button
4. Template will populate JSA Builder with pre-filled steps
5. Customize as needed for your specific project
6. Add signatures and complete JSA

### File Locations

- Templates: `shared/templates.construction.ts`
- PPE Standards: `shared/ppeStandards.ts`
- Sample JSA: `shared/jsa.sample.concrete.ts`
- Types: `shared/jsaAlamoTypes.ts`

### Template Structure

```typescript
{
  name: "Template Name",
  rows: [
    {
      order: 1,
      step: "Step description",
      hazards: "Hazards identified",
      procedures: "Safety procedures"
    }
    // ... more rows
  ],
  notes: ["Optional safety notes"]
}
```

---

## Customization

Templates can be customized:
- Add/remove job steps
- Modify hazards and procedures
- Include project-specific requirements
- Add continuation pages for complex tasks
- Include extra safety notes

All customizations are saved to the specific JSA and don't affect the base template.

---

## AI Learning (Future)

The system is designed to learn from JSA usage:
- Track which hazards are added most frequently
- Identify common control measures by project type
- Auto-suggest improvements based on historical data
- Adapt templates to organization-specific needs

**API Endpoint (Planned):** `POST /api/jsas/:id/suggest`
- Analyzes project context
- Returns AI-suggested hazards and controls
- Learns from supervisor/EHS edits
