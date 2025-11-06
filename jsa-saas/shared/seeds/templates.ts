import { JsaTemplateSeed } from "../types";
export const TEMPLATES: JsaTemplateSeed[] = [
  { name:"Concrete Pour & Formwork", rows:[
    { order:1, step:"Formwork inspection", hazards:"Collapse; impalement", procedures:"Competent inspection; rebar caps" },
    { order:2, step:"Pump truck setup", hazards:"Struck-by; overhead power", procedures:"Outriggers/pads; maintain clearance" },
    { order:3, step:"Placement", hazards:"Hose whip; irritation", procedures:"Exclusion zone; gloves/eye PPE" },
    { order:4, step:"Vibrate/finish", hazards:"Vibration; cords; noise", procedures:"Rotation; GFCI; manage cables; hearing protection" },
    { order:5, step:"Cure/protect", hazards:"Chemicals; trips", procedures:"SDS; barricade & signage" },
    { order:6, step:"Strip formwork", hazards:"Falling panels; pinch", procedures:"Engineer approval; controlled area" }
  ]},
  { name:"Excavation & Trenching", rows:[
    { order:1, step:"Utility locates", hazards:"Underground utilities", procedures:"Verify locates; hand dig to expose" },
    { order:2, step:"Excavate", hazards:"Cave-in; spoil collapse", procedures:"Slope/shoring/box; spoil 2 ft back" },
    { order:3, step:"Access/egress", hazards:"Falls; entrapment", procedures:"Ladders within 25 ft; extend 3 ft" },
    { order:4, step:"In-trench work", hazards:"Atmosphere; falling objects", procedures:"Test air; barricade edges" },
    { order:5, step:"Backfill/compact", hazards:"Struck-by; dust/noise", procedures:"Spotter; water dust; hearing protection" },
    { order:6, step:"Demobilize", hazards:"Trips; unguarded holes", procedures:"Backfill/plate/guard; remove signage" }
  ]}
];
