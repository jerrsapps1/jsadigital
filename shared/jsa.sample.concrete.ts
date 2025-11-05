import { UNIVERSAL_PPE_STANDARDS } from "./ppeStandards";
import type { JsaAlamoDoc } from "./jsaAlamoTypes";

export const SAMPLE_JSA_CONCRETE: JsaAlamoDoc = {
  id: "seed-jsa-concrete-001",
  org: { name: "Acme Construction", logoUrl: undefined },
  meta: {
    dateISO: new Date().toISOString().slice(0, 10),
    jobTask: "Concrete Pour & Formwork – Plaza Deck (Job #PLZ-2043)",
    department: "Field Ops",
    section: "Structures",
    reviewedBy: "Maria Gomez (Safety Manager)",
    approvedBy: "Daniel Price (PM)",
    analysisBy: "Lee Carter",
    competentPersons: "Lee Carter (Formwork), Pat Reed (Rigging)"
  },
  project: {
    name: "Plaza Deck Expansion",
    jobNumber: "PLZ-2043",
    location: "1200 Riverside Ave, Building B",
    gps: "29.4260° N, 98.4861° W"
  },
  ppeStandards: UNIVERSAL_PPE_STANDARDS,
  steps: [
    { order: 1, step: "Formwork inspection / rebar caps", hazards: "Collapse, impalement, trips", procedures: "Competent inspection; cap rebar; verify shoring" },
    { order: 2, step: "Pump truck setup / outriggers", hazards: "Struck-by, tip-over, overhead power", procedures: "Use mats; level; maintain line clearance; exclusion zone" },
    { order: 3, step: "Concrete placement", hazards: "Hose whip, chemical irritation, slips", procedures: "Control pump pressure; gloves/eye PPE; maintain walking paths" },
    { order: 4, step: "Vibration/finishing", hazards: "Ergonomics, cords, noise", procedures: "Job rotation; GFCI; manage cords/hoses; hearing protection" },
    { order: 5, step: "Curing & protection", hazards: "Chemical exposure, trips", procedures: "SDS for curing agents; barricade; signage" },
    { order: 6, step: "Strip formwork", hazards: "Falling panels, pinch", procedures: "Engineer sign-off as needed; controlled area; team lift" }
  ],
  extraNotes: [
    "Review weather and wind criteria for pump boom operation.",
    "Confirm egress paths remain clear during placement.",
    "All workers briefed on hose whip prevention and communication signals."
  ],
  continuationRows: 10,
  signatures: [
    { namePrinted: "Jordan Smith" },
    { namePrinted: "Ava Patel" },
    { namePrinted: "Miguel Torres" },
    { namePrinted: "Priya Nair" },
    { namePrinted: "Darius Chen" }
  ]
};
