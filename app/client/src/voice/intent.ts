export type Intent =
  | { kind: "reuse_last"; project?: string; task?: string; hazardsSame?: boolean }
  | { kind: "set_project"; project: string }
  | { kind: "set_task"; task: string }
  | { kind: "set_location"; location: string }
  | { kind: "set_date"; iso: string }
  | { kind: "add_step"; step: string }
  | { kind: "add_hazard"; hazard: string; controls?: string[] }
  | { kind: "toggle_special"; key: "hotWork" | "loto" | "craneLift" | "trafficControl" | "confinedSpace"; on?: boolean }
  | { kind: "finish" };

const yes = /(yes|on|enable|turn on|include)/i;
const no = /(no|off|disable|turn off|exclude)/i;

export function parseCommands(input: string): Intent[] {
  const t = input.toLowerCase();
  const intents: Intent[] = [];

  // Reuse patterns
  if (/same (project|job)/.test(t) || /same as last/.test(t) || /again today/.test(t)) {
    intents.push({ kind: "reuse_last", hazardsSame: /same hazards?/.test(t) });
  }

  // Project
  const mProj = input.match(/project (?:named|called)?\s*([A-Za-z0-9\- _#]+)/i);
  if (mProj) intents.push({ kind: "set_project", project: mProj[1].trim() });

  // Task
  const mTask = 
    input.match(/(?:task|work|doing)\s*[:\- ]\s*([A-Za-z0-9\- &,/]+)/i) || 
    input.match(/new task\s+([A-Za-z0-9\- &,/]+)/i);
  if (mTask) intents.push({ kind: "set_task", task: mTask[1].trim() });

  // Steps (allow multiple with ; or ,)
  const stepMatches = input.match(/add step[s]?:?\s*([\s\S]+?)(?=;|add hazard|toggle|finish|location|$)/i);
  if (stepMatches) {
    stepMatches[1].split(/[;,]/).forEach(s => {
      const step = s.trim();
      if (step && !/(add hazard|toggle|finish|location)/i.test(step)) {
        intents.push({ kind: "add_step", step });
      }
    });
  }

  // Hazards
  const haz = input.match(/add hazard[s]?:?\s*([\s\S]+?)(?=;|add step|toggle|finish|$)/i);
  if (haz) {
    haz[1].split(/[;,]/).forEach(h => {
      const txt = h.trim();
      if (txt && !/(add step|toggle|finish)/i.test(txt)) {
        intents.push({ kind: "add_hazard", hazard: txt });
      }
    });
  }

  // Special field toggles
  if (/hot work/.test(t)) {
    intents.push({ 
      kind: "toggle_special", 
      key: "hotWork", 
      on: yes.test(t) ? true : no.test(t) ? false : true 
    });
  }
  if (/(lockout|loto)/.test(t)) {
    intents.push({ 
      kind: "toggle_special", 
      key: "loto", 
      on: yes.test(t) ? true : no.test(t) ? false : true 
    });
  }
  if (/(crane|lift plan)/.test(t)) {
    intents.push({ 
      kind: "toggle_special", 
      key: "craneLift", 
      on: yes.test(t) ? true : no.test(t) ? false : true 
    });
  }
  if (/(traffic control|tcp)/.test(t)) {
    intents.push({ 
      kind: "toggle_special", 
      key: "trafficControl", 
      on: yes.test(t) ? true : no.test(t) ? false : true 
    });
  }
  if (/confined space/.test(t)) {
    intents.push({ 
      kind: "toggle_special", 
      key: "confinedSpace", 
      on: yes.test(t) ? true : no.test(t) ? false : true 
    });
  }

  // Location
  const mLoc = input.match(/location[: ]\s*([^,;]+)(?:[,;]|$)/i);
  if (mLoc) intents.push({ kind: "set_location", location: mLoc[1].trim() });

  // Date
  if (/today/.test(t)) {
    intents.push({ kind: "set_date", iso: new Date().toISOString().slice(0, 10) });
  }

  // Finish
  if (/finish|create|build it|make it|done/.test(t)) {
    intents.push({ kind: "finish" });
  }

  return intents;
}
