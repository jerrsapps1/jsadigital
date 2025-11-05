export type JsaTemplateRow = { 
  order: number; 
  step: string; 
  hazards: string; 
  procedures: string; 
};

export type JsaTemplateSeed = {
  name: string;
  rows: JsaTemplateRow[];
  notes?: string[];
};

export const TEMPLATES_CONSTRUCTION: JsaTemplateSeed[] = [
  {
    name: "Excavation & Trenching (≤ 15 ft)",
    rows: [
      { order: 1, step: "Pre-task plan & utility locates",
        hazards: "Underground utilities; struck-by from traffic/equipment",
        procedures: "Verify 811/utility marks; brief crew; set traffic control; assign spotter" },
      { order: 2, step: "Excavation start",
        hazards: "Cave-in; equipment swing; spoil pile collapse",
        procedures: "Keep spoil ≥2 ft from edge; use protective system (sloping/shoring/box); maintain swing radius exclusion" },
      { order: 3, step: "Access/egress",
        hazards: "Falls; entrapment",
        procedures: "Ladders within 25 ft; keep ladder 3 ft above landing; maintain clear path" },
      { order: 4, step: "Work in trench",
        hazards: "Atmospheric hazards; engulfment; falling objects",
        procedures: "Daily competent person inspection; atmospheric testing as needed; barricade edges; hard hats mandatory" },
      { order: 5, step: "Backfilling/compaction",
        hazards: "Struck-by rollers/compact equipment; dust/noise",
        procedures: "Spotter; maintain minimum approach; water for dust; hearing protection" },
      { order: 6, step: "Demobilize/restore site",
        hazards: "Trips; unguarded holes",
        procedures: "Backfill/plate or guard; remove signage; final inspection" }
    ],
    notes: ["Follow soil classification requirements; stop work on water intrusion or fissures."]
  },
  {
    name: "Scaffolding (Erection/Use/Dismantle)",
    rows: [
      { order: 1, step: "Deliver materials & set base",
        hazards: "Strains; pinch points; unstable base",
        procedures: "Use base plates/mud sills; team lift; gloves; level and plumb" },
      { order: 2, step: "Frame/brace install",
        hazards: "Falls; dropped objects",
        procedures: "100% fall protection above threshold; toeboards; tool lanyards; maintain 3 points of contact" },
      { order: 3, step: "Decking/guardrails",
        hazards: "Open edges; collapse",
        procedures: "Install guardrails/midrails; fully deck; inspect locks/pins" },
      { order: 4, step: "Access",
        hazards: "Improper ladder use; slips",
        procedures: "Internal ladders or stair towers; secure ladder; keep clear of ice/mud" },
      { order: 5, step: "Use phase",
        hazards: "Overloading; weather",
        procedures: "Do not exceed load; inspect daily; remove ice/snow; tie-ins per height" },
      { order: 6, step: "Dismantle",
        hazards: "Falling components; instability",
        procedures: "Reverse order; maintain 3-pole rule; exclusion zone below" }
    ]
  },
  {
    name: "Roof Work / Fall Protection",
    rows: [
      { order: 1, step: "Access roof",
        hazards: "Ladder falls; edge exposure",
        procedures: "Secure ladder 1:4; extend 3 ft; install warning lines/guardrails where required" },
      { order: 2, step: "Set fall protection",
        hazards: "Unanchored lifelines; swing fall",
        procedures: "Use certified anchors; inspect connectors; plan tie-off route" },
      { order: 3, step: "Material staging",
        hazards: "Edge pushing; wind",
        procedures: "Keep ≥6 ft from edge; secure materials; wind hold criteria" },
      { order: 4, step: "Perform task",
        hazards: "Trips; heat stress",
        procedures: "Housekeeping; hydration/cooling plan; spotter when near edges" },
      { order: 5, step: "Weather monitoring",
        hazards: "Slip on wet/ice; lightning",
        procedures: "Stop work on slick surfaces; monitor weather; evacuate for lightning per policy" },
      { order: 6, step: "Demob",
        hazards: "Unprotected edges during removal",
        procedures: "Maintain protection until last; inspect and remove anchors" }
    ]
  },
  {
    name: "Concrete Pour & Formwork",
    rows: [
      { order: 1, step: "Formwork inspection",
        hazards: "Collapse; impalement",
        procedures: "Engineer/competent person verification; cap rebar; verify shoring" },
      { order: 2, step: "Pump/buggy setup",
        hazards: "Struck-by; hose whip; overhead power",
        procedures: "Set outriggers/pads; maintain power line clearance; tag-lines; exclusion zone" },
      { order: 3, step: "Pour concrete",
        hazards: "Skin/eye irritation; hose whip; slips",
        procedures: "Wear gloves/eye protection; control pump pressure; maintain walking paths" },
      { order: 4, step: "Vibrate/finish",
        hazards: "Vibration/ergonomics; cords",
        procedures: "Job rotation; GFCI; manage cords/hoses; hearing protection" },
      { order: 5, step: "Cure/protect",
        hazards: "Chemical exposure; trip hazards",
        procedures: "Follow SDS for curing agents; barricade; signage" },
      { order: 6, step: "Strip formwork",
        hazards: "Falling panels; pinch",
        procedures: "Engineer sign-off if needed; controlled area; team lift" }
    ]
  },
  {
    name: "Electrical LOTO (Construction)",
    rows: [
      { order: 1, step: "Identify energy sources",
        hazards: "Unexpected energization; arc flash",
        procedures: "Review one-line/SDS; select arc-rated PPE; boundary markings" },
      { order: 2, step: "Shut down & isolate",
        hazards: "Shock; stored energy",
        procedures: "Open disconnects; bleed capacitors; verify isolation points" },
      { order: 3, step: "Apply locks/tags",
        hazards: "Bypass/mistag",
        procedures: "Personal locks only; unique keys; group lock box if required" },
      { order: 4, step: "Verify zero energy",
        hazards: "Residual voltage",
        procedures: "Test-before-touch; rated meter; test meter on known source" },
      { order: 5, step: "Perform work",
        hazards: "Arc/flash; tool failure",
        procedures: "Use insulated tools; maintain boundaries; buddy system" },
      { order: 6, step: "Remove LOTO/restore",
        hazards: "Unexpected start-up",
        procedures: "Clear personnel/tools; remove tags/locks in order; notify affected workers" }
    ]
  },
  {
    name: "Crane / Rigging & Lifting",
    rows: [
      { order: 1, step: "Lift plan & communication",
        hazards: "Load drop; struck-by",
        procedures: "Qualified rigger/signaler; hand/voice/radio protocol; exclusion zone" },
      { order: 2, step: "Inspect crane/rigging",
        hazards: "Equipment failure",
        procedures: "Daily inspection; reject damaged slings; proper hitch/angles" },
      { order: 3, step: "Setup & outriggers",
        hazards: "Tip-over; ground failure",
        procedures: "Use mats; level; verify soil bearing capacity" },
      { order: 4, step: "Test pick",
        hazards: "Unbalanced load",
        procedures: "Slow take-up; verify rigging; adjust center of gravity" },
      { order: 5, step: "Perform lift",
        hazards: "Power lines; wind",
        procedures: "Maintain clearance; monitor wind; tag lines; no travel over personnel" },
      { order: 6, step: "Landing & demob",
        hazards: "Pinch; unstable set-down",
        procedures: "Clear landing zone; guide with tag lines; stow gear" }
    ]
  },
  {
    name: "Hot Work (Cutting/Welding)",
    rows: [
      { order: 1, step: "Permit & area prep",
        hazards: "Fire; explosion",
        procedures: "Hot work permit; remove combustibles 35 ft or shield; fire watch" },
      { order: 2, step: "Set equipment",
        hazards: "Gas leaks; flashback",
        procedures: "Inspect hoses; check flashback arrestors; leak test" },
      { order: 3, step: "Perform hot work",
        hazards: "Radiant heat; eye injury",
        procedures: "Welding hood/face shield; gloves; FR clothing; screens" },
      { order: 4, step: "Post-work fire watch",
        hazards: "Smoldering fires",
        procedures: "30-60 min fire watch; check below/adjacent levels" },
      { order: 5, step: "Cylinder handling",
        hazards: "Tip/rupture",
        procedures: "Cap cylinders; secure upright; transport with carts" },
      { order: 6, step: "Housekeeping",
        hazards: "Slips/trips",
        procedures: "Remove slag/scrap; coil hoses; cool down area" }
    ]
  },
  {
    name: "General Housekeeping / Material Handling",
    rows: [
      { order: 1, step: "Staging materials",
        hazards: "Blocked egress; unstable stacks",
        procedures: "Maintain clear aisles; stack on flat surface; banding as needed" },
      { order: 2, step: "Manual handling",
        hazards: "Strains; pinch",
        procedures: "Team lift; mechanical aids; keep load close; neutral spine" },
      { order: 3, step: "Powered equipment",
        hazards: "Struck-by; blind spots",
        procedures: "Spotter; backup alarms; traffic plan" },
      { order: 4, step: "Waste removal",
        hazards: "Cuts; puncture; dust",
        procedures: "Gloves; segregate waste; wet methods for dust" },
      { order: 5, step: "Daily cleanup",
        hazards: "Trips/slips",
        procedures: "End-of-shift sweep; coil cords/hoses; signage for wet floors" },
      { order: 6, step: "Storage",
        hazards: "Topple; chemical incompatibility",
        procedures: "Heaviest low; secure verticals; segregate chemicals per SDS" }
    ]
  }
];
