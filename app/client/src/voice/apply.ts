import type { JsaAlamoDoc } from "@shared/types";
import { TEMPLATES } from "@shared/seeds/templates";
import { UNIVERSAL_PPE_STANDARDS } from "@shared/seeds/ppe";
import type { Intent } from "./intent";

export function createFromTemplate(name: string): JsaAlamoDoc {
  const t = TEMPLATES.find(x => 
    x.name.toLowerCase().includes(name.toLowerCase())
  ) || TEMPLATES[0];
  
  return {
    id: `jsa-${Date.now()}`,
    org: { name: "Acme Construction" },
    meta: { 
      dateISO: new Date().toISOString().slice(0, 10), 
      jobTask: t.name 
    },
    project: { 
      name: "", 
      jobNumber: "", 
      location: "" 
    },
    ppeStandards: [...UNIVERSAL_PPE_STANDARDS],
    steps: t.rows.map(r => ({ ...r })),
    continuationRows: 8,
    signatures: [],
    special: {}
  };
}

export function applyIntents(
  intents: Intent[], 
  ctx: {
    current?: JsaAlamoDoc | null;
    findLast?: (opts: { project?: string; task?: string }) => JsaAlamoDoc | undefined;
  }
): { draft: JsaAlamoDoc; summary: string[] } {
  let draft = ctx.current ?? createFromTemplate("General Housekeeping / Material Handling");
  const notes: string[] = [];

  for (const intent of intents) {
    switch (intent.kind) {
      case "reuse_last": {
        if (ctx.findLast) {
          const last = ctx.findLast({ project: intent.project, task: intent.task }) || ctx.findLast({});
          if (last) {
            draft = { 
              ...last, 
              id: `jsa-${Date.now()}`, 
              meta: { 
                ...last.meta, 
                dateISO: new Date().toISOString().slice(0, 10) 
              } 
            };
            notes.push("✓ Reused last JSA for this project/task");
          } else {
            notes.push("⚠ No previous JSA found, starting fresh");
          }
        }
        break;
      }

      case "set_project": {
        draft.project.name = intent.project;
        notes.push(`✓ Project: ${intent.project}`);
        break;
      }

      case "set_task": {
        draft.meta.jobTask = intent.task;
        // If a known template matches new task, refresh steps
        const t = TEMPLATES.find(x => 
          x.name.toLowerCase().includes(intent.task.toLowerCase())
        );
        if (t) {
          draft.steps = t.rows.map(r => ({ ...r }));
          notes.push(`✓ Loaded template: ${t.name}`);
        } else {
          notes.push(`✓ Task set: ${intent.task}`);
        }
        break;
      }

      case "set_location": {
        draft.project.location = intent.location;
        notes.push(`✓ Location: ${intent.location}`);
        break;
      }

      case "set_date": {
        draft.meta.dateISO = intent.iso;
        notes.push(`✓ Date: ${intent.iso}`);
        break;
      }

      case "add_step": {
        draft.steps.push({
          order: draft.steps.length + 1,
          step: intent.step,
          hazards: "",
          procedures: ""
        });
        notes.push(`✓ Added step: ${intent.step}`);
        break;
      }

      case "add_hazard": {
        // Append to the last step's hazards
        const idx = Math.max(0, draft.steps.length - 1);
        const existing = draft.steps[idx].hazards;
        draft.steps[idx].hazards = existing 
          ? `${existing}; ${intent.hazard}` 
          : intent.hazard;
        notes.push(`✓ Added hazard: ${intent.hazard}`);
        break;
      }

      case "toggle_special": {
        const key = intent.key;
        const isOn = intent.on ?? true;
        
        if (!draft.special) draft.special = {};
        
        switch (key) {
          case "hotWork":
            draft.special.hotWork = { 
              permitRequired: isOn,
              ...(isOn && { fireWatchMins: 60, cleared35ft: "Yes" })
            };
            break;
          case "loto":
            draft.special.loto = { 
              required: isOn,
              ...(isOn && { pointsVerified: "No", zeroVerified: "No" })
            };
            break;
          case "craneLift":
            draft.special.craneLift = { 
              planRequired: isOn,
              ...(isOn && { qualified: "Yes", powerClearance: "Yes" })
            };
            break;
          case "trafficControl":
            draft.special.trafficControl = { 
              tcpRequired: isOn,
              ...(isOn && { flaggers: "As Needed", lightingPlan: "N/A" })
            };
            break;
          case "confinedSpace":
            draft.special.confinedSpace = { 
              requiresPermit: isOn,
              ...(isOn && { 
                rescuePlanVerified: false,
                atmosphericMonitoring: {
                  required: true,
                  gases: ["O2", "LEL", "H2S", "CO"],
                  continuous: true,
                  ventilationCFM: 500
                }
              })
            };
            break;
        }
        
        notes.push(`✓ ${isOn ? "Enabled" : "Disabled"} ${key}`);
        break;
      }

      case "finish": {
        notes.push("✓ Ready to create JSA");
        break;
      }
    }
  }

  return { draft, summary: notes };
}
