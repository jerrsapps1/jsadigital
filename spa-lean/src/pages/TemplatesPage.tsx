import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "@shared/seeds/templates";

export default function TemplatesPage() {
  const nav = useNavigate();
  const go = (name: string, gov: boolean) =>
    nav(`/builder?tpl=${encodeURIComponent(name)}&gov=${gov}`);

  return (
    <div style={{ padding: 16 }}>
      <h1>JSA Templates</h1>
      <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        <span>Is this for a Government/USACE project?</span>
        <input id="gov" type="checkbox" />
      </label>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', marginTop: 16 }}>
        {TEMPLATES.map(t => (
          <div key={t.name} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{t.rows.length} steps</div>
            <button style={{ marginTop: 8 }}
              onClick={() => go(t.name, (document.getElementById('gov') as HTMLInputElement).checked)}>
              Use This Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
