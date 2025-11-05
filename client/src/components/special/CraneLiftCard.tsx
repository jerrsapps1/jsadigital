export default function CraneLiftCard({ special, setSpecial }: { special:any; setSpecial:(updater:any)=>void }) {
  const cr = special?.craneLift || { planRequired: true };
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Crane / Critical Lift</h3>
      <label className="flex items-center gap-2 mb-3">
        <input 
          type="checkbox"
          data-testid="checkbox-lift-plan"
          className="rounded"
          checked={!!cr.planRequired}
          onChange={e=>setSpecial((s:any)=>({ ...s, craneLift: { ...(s?.craneLift||{}), planRequired: e.target.checked }}))}
        />
        <span className="text-sm">Critical Lift Plan Required</span>
      </label>
      <label className="block mb-3">
        <span className="text-sm font-medium mb-1 block">Rigger/Signaler Qualified</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={cr.qualified ?? "Yes"}
          data-testid="select-rigger-qualified"
          onChange={e=>setSpecial((s:any)=>({ ...s, craneLift: { ...(s?.craneLift||{}), qualified: e.target.value }}))}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium mb-1 block">Power Line Clearance Verified</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={cr.powerClearance ?? "Yes"}
          data-testid="select-power-clearance"
          onChange={e=>setSpecial((s:any)=>({ ...s, craneLift: { ...(s?.craneLift||{}), powerClearance: e.target.value }}))}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="N/A">N/A</option>
        </select>
      </label>
    </div>
  );
}
