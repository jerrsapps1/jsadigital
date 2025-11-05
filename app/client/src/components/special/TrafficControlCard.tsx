export default function TrafficControlCard({ special, setSpecial }: { special:any; setSpecial:(updater:any)=>void }) {
  const tc = special?.trafficControl || { tcpRequired: true };
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Roadway Traffic Control</h3>
      <label className="flex items-center gap-2 mb-3">
        <input 
          type="checkbox"
          data-testid="checkbox-tcp-required"
          className="rounded"
          checked={!!tc.tcpRequired}
          onChange={e=>setSpecial((s:any)=>({ ...s, trafficControl: { ...(s?.trafficControl||{}), tcpRequired: e.target.checked }}))}
        />
        <span className="text-sm">Traffic Control Plan (TCP) Required</span>
      </label>
      <label className="block mb-3">
        <span className="text-sm font-medium mb-1 block">Flaggers Assigned</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={tc.flaggers ?? "As Needed"}
          data-testid="select-flaggers"
          onChange={e=>setSpecial((s:any)=>({ ...s, trafficControl: { ...(s?.trafficControl||{}), flaggers: e.target.value }}))}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="As Needed">As Needed</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium mb-1 block">Night Ops Lighting Plan</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={tc.lightingPlan ?? "N/A"}
          data-testid="select-lighting-plan"
          onChange={e=>setSpecial((s:any)=>({ ...s, trafficControl: { ...(s?.trafficControl||{}), lightingPlan: e.target.value }}))}
        >
          <option value="N/A">N/A</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>
    </div>
  );
}
