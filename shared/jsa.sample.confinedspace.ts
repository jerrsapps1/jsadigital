import { UNIVERSAL_PPE_STANDARDS } from "./ppeStandards";
import type { JsaAlamoDoc } from "./jsaAlamoTypes";

export const SAMPLE_JSA_CONFINED_SPACE: JsaAlamoDoc = {
  id: "seed-jsa-confined-001",
  org: { name: "Acme Construction", logoUrl: undefined },
  meta: {
    dateISO: new Date().toISOString().slice(0, 10),
    jobTask: "Confined Space Entry – Underground Vault Inspection (Job #UGV-5012)",
    department: "Field Ops",
    section: "Utilities",
    reviewedBy: "Sarah Chen (EHS Manager)",
    approvedBy: "Robert Martinez (PM)",
    analysisBy: "Carlos Rodriguez",
    competentPersons: "Carlos Rodriguez (Entry Supervisor), Kim Lee (Attendant)"
  },
  project: {
    name: "Underground Vault Inspection",
    jobNumber: "UGV-5012",
    location: "500 Commerce St, Vault #12B",
    gps: "29.4252° N, 98.4946° W"
  },
  ppeStandards: [
    ...UNIVERSAL_PPE_STANDARDS,
    "NIOSH-approved respirator (fit-tested)",
    "Intrinsically safe flashlight and tools",
    "Full-body harness with retrieval system"
  ],
  steps: [
    { order: 1, step: "Identify space & classify as permit-required", 
      hazards: "Oxygen deficiency; toxic/flammable atmospheres; engulfment", 
      procedures: "Evaluate permit status; isolate energy sources; develop entry permit with rescue plan" },
    { order: 2, step: "Atmospheric testing (initial & continuous)", 
      hazards: "Unseen gas/vapor; explosive mix; oxygen displacement", 
      procedures: "Calibrated multi-gas monitor; test O2, LEL, H2S, CO; record readings; verify acceptable ranges" },
    { order: 3, step: "Ventilation & purging", 
      hazards: "Accumulation of contaminants; inadequate air exchange", 
      procedures: "Mechanical ventilation at 500+ CFM; purge 5+ air changes; maintain continuous flow" },
    { order: 4, step: "Entry setup & communications", 
      hazards: "Entrapment; lack of rescue capability; communication failure", 
      procedures: "Attendant stationed at entry; radio/visual signals tested; retrieval system ready; rescue team on standby" },
    { order: 5, step: "Perform inspection work", 
      hazards: "Heat stress; ergonomic strain; sparks from tools; claustrophobia", 
      procedures: "Work-rest cycles per WBGT; intrinsically safe tools only; buddy checks every 15 min; mental status monitoring" },
    { order: 6, step: "Exit & permit closeout", 
      hazards: "Residual hazards; incomplete accountability", 
      procedures: "Account for all personnel/tools; remove LOTO systematically; document final readings; close permit" }
  ],
  extraNotes: [
    "Entry team limited to 2 persons maximum; attendant maintains continuous visual/voice contact.",
    "Rescue plan includes non-entry retrieval and emergency services notification (911).",
    "Stop work immediately if O2 <19.5% or >23.5%, LEL >10%, H2S >10ppm, or CO >35ppm.",
    "All entrants and attendants certified in confined space procedures (annual training).",
    "Standby rescue service contacted and on-call during entry operations.",
    "No hot work permitted inside space without additional hot work permit."
  ],
  continuationRows: 4,
  signatures: [
    { namePrinted: "Carlos Rodriguez" },
    { namePrinted: "Kim Lee" },
    { namePrinted: "Tyler Washington" },
    { namePrinted: "Aisha Patel" }
  ],
  special: {
    confinedSpace: {
      requiresPermit: true,
      permitNo: "CS-2025-012",
      attendantName: "Kim Lee",
      rescuePlanVerified: true,
      atmosphericMonitoring: {
        required: true,
        gases: ["O2", "LEL", "H2S", "CO"],
        readings: {
          O2: "20.8%",
          LEL: "0% LEL",
          H2S: "0 ppm",
          CO: "0 ppm"
        },
        acceptableRanges: {
          O2: "19.5%–23.5%",
          LEL: "< 10% LEL",
          H2S: "< 10 ppm",
          CO: "< 35 ppm"
        },
        continuous: true,
        ventilationCFM: 600
      },
      isolationCompleted: true
    }
  }
};
