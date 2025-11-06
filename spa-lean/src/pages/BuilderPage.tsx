import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import PrintableJSA_Alamo from "../components/PrintableJSA_Alamo";
import type { JsaAlamoDoc } from "@shared/types";
import { TEMPLATES } from "@shared/seeds/templates";
import { UNIVERSAL_PPE_STANDARDS } from "@shared/seeds/ppe";
import { downloadJson, uploadJson } from "../utils/local";

export default function BuilderPage() {
  const [params] = useSearchParams();
  const tpl = params.get('tpl') || '';
  const gov = params.get('gov') === 'true';

  const template = useMemo(() => TEMPLATES.find(t => t.name === tpl) || TEMPLATES[0], [tpl]);
  const [doc, setDoc] = useState<JsaAlamoDoc>(() => ({
    id: `jsa-${Date.now()}`,
    org: { name: "Acme Construction" },
    meta: { dateISO: new Date().toISOString().slice(0, 10), jobTask: template.name },
    project: { name: '', jobNumber: '', location: '', gps: '' },
    ppeStandards: UNIVERSAL_PPE_STANDARDS,
    steps: template.rows.map(r => ({ ...r })),
    continuationRows: 8,
    signatures: [],
    special: {}
  }));

  function updateRow(idx: number, patch: Partial<JsaAlamoDoc['steps'][number]>) {
    setDoc(d => ({ ...d, steps: d.steps.map((row, i) => i === idx ? { ...row, ...patch } : row) }));
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/templates">← Back to Templates</Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => window.print()}>Preview / Print</button>
          <button onClick={() => downloadJson(doc, `${doc.meta.jobTask}.json`)}>Export JSON</button>
          <button onClick={async () => {
            const incoming = await uploadJson<JsaAlamoDoc>();
            if (!incoming) return;
            setDoc(incoming);
          }}>Import JSON</button>
        </div>
      </div>

      <section style={{ marginTop: 12 }}>
        <h3>Project Info</h3>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(240px,1fr))' }}>
          <label>Job Task <input value={doc.meta.jobTask} onChange={e => setDoc(d => ({ ...d, meta: { ...d.meta, jobTask: e.target.value } }))} /></label>
          <label>Project <input value={doc.project.name || ''} onChange={e => setDoc(d => ({ ...d, project: { ...d.project, name: e.target.value } }))} /></label>
          <label>Job # <input value={doc.project.jobNumber || ''} onChange={e => setDoc(d => ({ ...d, project: { ...d.project, jobNumber: e.target.value } }))} /></label>
          <label>Location <input value={doc.project.location || ''} onChange={e => setDoc(d => ({ ...d, project: { ...d.project, location: e.target.value } }))} /></label>
        </div>
      </section>

      <section style={{ marginTop: 12 }}>
        <h3>Steps / Hazards / Controls</h3>
        {doc.steps.map((r, i) => (
          <div key={i} style={{ border: '1px solid #eee', padding: 8, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#666' }}>#{i + 1}</div>
            <input style={{ width: '100%', marginTop: 6 }} value={r.step}
              onChange={e => updateRow(i, { step: e.target.value })} placeholder="Step" />
            <input style={{ width: '100%', marginTop: 6 }} value={r.hazards}
              onChange={e => updateRow(i, { hazards: e.target.value })} placeholder="Hazards (why it's risky)" />
            <input style={{ width: '100%', marginTop: 6 }} value={r.procedures}
              onChange={e => updateRow(i, { procedures: e.target.value })} placeholder="Controls (what to do)" />
          </div>
        ))}
        <button onClick={() => setDoc(d => ({ ...d, steps: [...d.steps, { order: d.steps.length + 1, step: '', hazards: '', procedures: '' }] }))}>
          + Add Row
        </button>
      </section>

      <div style={{ marginTop: 16 }}>
        <PrintableJSA_Alamo doc={doc} />
      </div>
    </div>
  );
}
