import type { JsaAlamoDoc } from '../../../shared/jsaAlamoTypes';

type Props = { doc: JsaAlamoDoc };

const Small = ({ children }: { children: React.ReactNode }) =>
  <div className="small">{children}</div>;

export default function PrintableJSA_Alamo({ doc }: Props) {
  const d = doc;
  const date = new Date(d.meta.dateISO);

  return (
    <div className="alamo-print">
      <div className="page">
        <div className="brandbar">
          {d.org.logoUrl && <img className="brand" src={d.org.logoUrl} alt="logo" />}
          <div className="brandtext">
            <div className="dept">Environmental Health & Safety</div>
            <h1>JOB SAFETY ANALYSIS (JSA)</h1>
          </div>
        </div>

        <table className="hdr">
          <tbody>
            <tr>
              <td className="w50">
                <label>JOB TASK:</label>
                <div className="val">{d.meta.jobTask}</div>
              </td>
              <td className="w25">
                <label>DATE:</label>
                <div className="val">{date.toLocaleDateString()}</div>
              </td>
              <td className="w25">
              </td>
            </tr>
            <tr>
              <td className="w50">
                <label>JOB LOCATION:</label>
                <div className="val">{d.project.location ?? ''}</div>
              </td>
              <td className="w25">
                <label>COMPETENT PERSON/SUPERVISOR:</label>
                <div className="val">{d.meta.competentPersons ?? ''}</div>
              </td>
              <td className="w25">
                <label>ANALYSIS BY:</label>
                <div className="val">{d.meta.analysisBy ?? ''}</div>
              </td>
            </tr>
            <tr>
              <td className="w50">
                <label>GPS LOCATION:</label>
                <div className="val">{d.project.gps ?? ''}</div>
              </td>
              <td className="w25">
                <label>DEPARTMENT:</label>
                <div className="val">{d.meta.department ?? ''}</div>
              </td>
              <td className="w25">
                <label>SECTION:</label>
                <div className="val">{d.meta.section ?? ''}</div>
              </td>
            </tr>
            <tr>
              <td className="w50">
                <label>REQUIRED AND/OR RECOMMENDED PERSONAL PROTECTIVE EQUIPMENT:</label>
                <div className="ppe">
                  {(d.ppeStandards || []).map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </td>
              <td className="w25">
                <label>REVIEWED BY:</label>
                <div className="val">{d.meta.reviewedBy ?? ''}</div>
              </td>
              <td className="w25">
                <label>APPROVED BY:</label>
                <div className="val">{d.meta.approvedBy ?? ''}</div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="grid">
          <thead>
            <tr>
              <th>SEQUENCE OF BASIC JOB STEPS
                <Small>Beware of being too detailed; record only the information needed to describe each job action. Rule of thumb: no more than 10 steps/task being evaluated.</Small>
              </th>
              <th>POTENTIAL ACCIDENTS OR HAZARDS
                <Small>HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</Small>
              </th>
              <th>RECOMMENDED SAFE JOB PROCEDURE
                <Small>HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</Small>
              </th>
            </tr>
          </thead>
          <tbody>
            {d.steps.slice(0, 6).map((r) => (
              <tr key={r.order}>
                <td>{r.step}</td>
                <td>{r.hazards}</td>
                <td>{r.procedures}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(d.extraNotes && d.extraNotes.length > 0) && (
        <div className="page">
          <div className="brandheader">Environmental Health & Safety</div>
          <ul className="notes">
            {d.extraNotes.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      {d.steps.length > 6 && (
        <div className="page">
          <div className="brandheader">Environmental Health & Safety</div>
          <table className="grid">
            <thead>
              <tr>
                <th>SEQUENCE OF BASIC JOB STEPS
                  <Small>Beware of being too detailed, record only the information needed to describe each job action. Rule of thumb, no more than 10 steps/task being evaluated.</Small>
                </th>
                <th>POTENTIAL ACCIDENTS OR HAZARDS
                  <Small>HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</Small>
                </th>
                <th>RECOMMENDED SAFE JOB PROCEDURE
                  <Small>HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</Small>
                </th>
              </tr>
            </thead>
            <tbody>
              {d.steps.slice(6).map((r) => (
                <tr key={r.order}>
                  <td>{r.step}</td>
                  <td>{r.hazards}</td>
                  <td>{r.procedures}</td>
                </tr>
              ))}
              {d.continuationRows && d.continuationRows > 0 && Array.from({ length: d.continuationRows }).map((_, i) => (
                <tr key={`blank-${i}`}><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {d.steps.length <= 6 && d.continuationRows && d.continuationRows > 0 && (
        <div className="page">
          <div className="brandheader">Environmental Health & Safety</div>
          <table className="grid">
            <thead>
              <tr>
                <th>SEQUENCE OF BASIC JOB STEPS
                  <Small>Beware of being too detailed, record only the information needed to describe each job action. Rule of thumb, no more than 10 steps/task being evaluated.</Small>
                </th>
                <th>POTENTIAL ACCIDENTS OR HAZARDS
                  <Small>HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</Small>
                </th>
                <th>RECOMMENDED SAFE JOB PROCEDURE
                  <Small>HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</Small>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: d.continuationRows }).map((_, i) => (
                <tr key={i}><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="page">
        <div className="brandheader">Environmental Health & Safety</div>
        <p className="attest">
          By signing this Job Hazard Analysis (JHA) I attest that I have read and understand my task, the
          hazards involved, and recommended safe job procedures and that I will comply with this JHA. That I
          have been read/translated this JHA in my native language and fully understand the JHA.
        </p>
        <table className="siggrid">
          <thead><tr><th>Employee Name (Printed)</th><th>Employee Signature</th></tr></thead>
          <tbody>
            {d.signatures.map((s, i) => (
              <tr key={i}>
                <td>{s.namePrinted}</td>
                <td className="sigcell">{s.signatureImageUrl ? <img src={s.signatureImageUrl} alt="signature" /> : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
