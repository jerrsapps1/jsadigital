import React from 'react';
import { JsaAlamoDoc } from '../types';

export default function PrintableJSA_Alamo({ doc }: { doc: JsaAlamoDoc }) {
  return (
    <div className="alamo-print">
      <h1>JOB SAFETY ANALYSIS (JSA)</h1>
      <div><b>Task:</b> {doc.meta.jobTask} &nbsp; <b>Date:</b> {doc.meta.dateISO}</div>
      <div><b>Location:</b> {doc.project.location || ''}</div>
      <table className="grid" style={{width:'100%', borderCollapse:'collapse', marginTop:8}}>
        <thead><tr><th>Step</th><th>Hazards</th><th>Controls</th></tr></thead>
        <tbody>
        {doc.steps.slice(0,6).map((r,i)=>(
          <tr key={i}><td>{r.step}</td><td>{r.hazards}</td><td>{r.procedures}</td></tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
