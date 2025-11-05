export default function HotWorkCard({ special, setSpecial }: { special:any; setSpecial:(updater:any)=>void }) {
  const hw = special?.hotWork || { permitRequired: true, fireWatchMins: 60 };
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Hot Work Permit</h3>
      <label className="flex items-center gap-2 mb-3">
        <input 
          type="checkbox"
          data-testid="checkbox-hotwork-permit"
          className="rounded"
          checked={!!hw.permitRequired}
          onChange={e=>setSpecial((s:any)=>({ ...s, hotWork: { ...(s?.hotWork||{}), permitRequired: e.target.checked }}))}
        />
        <span className="text-sm">Permit Required</span>
      </label>
      <label className="block mb-3">
        <span className="text-sm font-medium mb-1 block">Fire Watch (minutes)</span>
        <input 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          type="number" 
          min={0}
          data-testid="input-firewatch-mins"
          value={hw.fireWatchMins ?? 60}
          onChange={e=>setSpecial((s:any)=>({ ...s, hotWork: { ...(s?.hotWork||{}), fireWatchMins: Number(e.target.value)||0 }}))}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium mb-1 block">Combustibles Cleared (35 ft)</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={hw.cleared35ft ?? "Yes"}
          data-testid="select-cleared35ft"
          onChange={e=>setSpecial((s:any)=>({ ...s, hotWork: { ...(s?.hotWork||{}), cleared35ft: e.target.value }}))}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="N/A">N/A</option>
        </select>
      </label>
    </div>
  );
}
