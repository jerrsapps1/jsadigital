import express from 'express';
export const suggestRouter = express.Router();

/**
 * GET /api/jsas/:id/suggest?template=Confined%20Space%20Entry
 * Returns: hazards/controls/ppe (as before) + ui toggles & defaults for special sections.
 */
suggestRouter.get('/jsas/:id/suggest', async (req, res) => {
  const template = (req.query.template || '').toString().toLowerCase();

  // base suggestions all templates can get
  const base: {
    hazards: Array<{ stepOrder: number; type: string; details: string }>;
    controls: Array<{ hazardType: string; type: string; details: string }>;
    ppe: string[];
  } = {
    hazards: [],
    controls: [],
    ppe: ["Hard Hat", "Safety Glasses", "Work Gloves", "High-Vis Vest", "Safety Footwear"]
  };

  // switches/toggles the UI can use
  const ui = {
    confinedSpace: false,
    atmosphericMonitoring: false,
    hotWorkPermit: false,
    loto: false,
    craneLiftPlan: false,
    trafficControlPlan: false,
  };

  // task-specific defaults
  const special: any = {};

  if (template.includes('confined space')) {
    ui.confinedSpace = true;
    ui.atmosphericMonitoring = true;
    special.confinedSpace = {
      requiresPermit: true,
      rescuePlanVerified: false,
      atmosphericMonitoring: {
        required: true,
        gases: ["O2", "LEL", "H2S", "CO"],
        acceptableRanges: {
          O2: "19.5%–23.5%",
          LEL: "< 10% LEL",
          H2S: "< 10 ppm (or per policy)",
          CO: "< 35 ppm (or per policy)"
        },
        continuous: true,
        ventilationCFM: 500
      },
      isolationCompleted: false
    };
    base.hazards.push(
      { stepOrder: 1, type: "Oxygen Deficiency", details: "Possible displacement by inert gases" },
      { stepOrder: 1, type: "Toxic/Flammable Atmosphere", details: "H2S/CO/LEL risk; continuous monitoring" },
      { stepOrder: 2, type: "Engulfment/Entrapment", details: "Sloping walls, flowing solids/liquids" }
    );
    base.controls.push(
      { hazardType: "Oxygen Deficiency", type: "Engineering", details: "Mechanical ventilation; verify readings" },
      { hazardType: "Toxic/Flammable Atmosphere", type: "Procedure", details: "Permit, continuous monitoring, intrinsically safe tools" },
      { hazardType: "Engulfment/Entrapment", type: "Procedure", details: "Retrieval system, attendant, communications" }
    );
  }

  if (template.includes('hot work')) {
    ui.hotWorkPermit = true;
    special.hotWork = { 
      permitRequired: true, 
      fireWatchMins: 60,
      cleared35ft: "Yes"
    };
    base.hazards.push({ stepOrder: 1, type: "Fire/Explosion", details: "Combustibles within 35 ft" });
    base.controls.push({ hazardType: "Fire/Explosion", type: "Permit", details: "Hot Work permit, fire watch 60 min" });
    base.ppe.push("FR Clothing", "Face Shield/Welding Hood", "Hearing Protection");
  }

  if (template.includes('electrical') || template.includes('loto')) {
    ui.loto = true;
    special.loto = { 
      required: true,
      pointsVerified: "No",
      zeroVerified: "No"
    };
    base.hazards.push({ stepOrder: 1, type: "Unexpected Energization", details: "Residual energy, incorrect isolation" });
    base.controls.push({ hazardType: "Unexpected Energization", type: "Procedure", details: "Apply LOTO, verify zero energy" });
    base.ppe.push("Arc-Rated PPE (as required)");
  }

  if (template.includes('crane') || template.includes('rigging')) {
    ui.craneLiftPlan = true;
    special.craneLift = { 
      planRequired: true,
      qualified: "Yes",
      powerClearance: "Yes"
    };
  }

  if (template.includes('traffic')) {
    ui.trafficControlPlan = true;
    special.trafficControl = { 
      tcpRequired: true,
      flaggers: "As Needed",
      lightingPlan: "N/A"
    };
  }

  if (template.includes('steel')) {
    ui.hotWorkPermit = true;
    special.hotWork = { 
      permitRequired: true, 
      fireWatchMins: 60,
      cleared35ft: "Yes"
    };
  }

  return res.json({ ...base, uiToggles: ui, special });
});
