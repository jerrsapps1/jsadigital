export default function LotoCard({ special, setSpecial }: { special:any; setSpecial:(updater:any)=>void }) {
  const lt = special?.loto || { required: true };
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Lockout/Tagout (LOTO)</h3>
      <label className="flex items-center gap-2 mb-3">
        <input 
          type="checkbox"
          data-testid="checkbox-loto-required"
          className="rounded"
          checked={!!lt.required}
          onChange={e=>setSpecial((s:any)=>({ ...s, loto: { ...(s?.loto||{}), required: e.target.checked }}))}
        />
        <span className="text-sm">LOTO Required</span>
      </label>
      <label className="block mb-3">
        <span className="text-sm font-medium mb-1 block">Isolation Points Verified</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={lt.pointsVerified ?? "No"}
          data-testid="select-points-verified"
          onChange={e=>setSpecial((s:any)=>({ ...s, loto: { ...(s?.loto||{}), pointsVerified: e.target.value }}))}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium mb-1 block">Zero Energy Verified</span>
        <select 
          className="w-full px-3 py-2 rounded-md border bg-background" 
          value={lt.zeroVerified ?? "No"}
          data-testid="select-zero-verified"
          onChange={e=>setSpecial((s:any)=>({ ...s, loto: { ...(s?.loto||{}), zeroVerified: e.target.value }}))}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </label>
    </div>
  );
}
