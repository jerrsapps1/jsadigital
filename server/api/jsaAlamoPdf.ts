import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import type { JsaAlamoDoc } from '../../shared/jsaAlamoTypes';

export const jsaAlamoPdf = express.Router();

const htmlTemplate = (data: JsaAlamoDoc, css: string) => `<!doctype html>
<html><head><meta charset="utf-8" />
<style>${css}</style>
</head><body>
<div id="root"></div>
<script>window.__JSA__=${JSON.stringify(data).replace(/</g,'\\u003c')}</script>
<script>
  const d = window.__JSA__;
  document.write('<div class="alamo-print">'+
    '<div class="page">'+
      '<div class="brandbar">'+
        (d.org.logoUrl?'<img class="brand" src="'+d.org.logoUrl+'" />':'')+
        '<div class="brandtext"><div class="dept">Environmental Health & Safety</div><h1>JOB SAFETY ANALYSIS (JSA)</h1></div>'+
      '</div>'+
      '<table class="hdr"><tbody>'+
        '<tr><td class="w50"><label>JOB TASK:</label><div class="val">'+(d.meta.jobTask||'')+'</div></td>'+
            '<td class="w25"><label>DATE:</label><div class="val">'+new Date(d.meta.dateISO).toLocaleDateString()+'</div></td>'+
            '<td class="w25"></td></tr>'+
        '<tr><td class="w50"><label>JOB LOCATION:</label><div class="val">'+(d.project.location||'')+'</div></td>'+
            '<td class="w25"><label>COMPETENT PERSON/SUPERVISOR:</label><div class="val">'+(d.meta.competentPersons||'')+'</div></td>'+
            '<td class="w25"><label>ANALYSIS BY:</label><div class="val">'+(d.meta.analysisBy||'')+'</div></td></tr>'+
        '<tr><td class="w50"><label>GPS LOCATION:</label><div class="val">'+(d.project.gps||'')+'</div></td>'+
            '<td class="w25"><label>DEPARTMENT:</label><div class="val">'+(d.meta.department||'')+'</div></td>'+
            '<td class="w25"><label>SECTION:</label><div class="val">'+(d.meta.section||'')+'</div></td></tr>'+
        '<tr><td class="w50"><label>REQUIRED AND/OR RECOMMENDED PERSONAL PROTECTIVE EQUIPMENT:</label>'+
              '<div class="ppe">'+(d.ppeStandards||[]).map(l=>'<div>'+l+'</div>').join('')+'</div></td>'+
            '<td class="w25"><label>REVIEWED BY:</label><div class="val">'+(d.meta.reviewedBy||'')+'</div></td>'+
            '<td class="w25"><label>APPROVED BY:</label><div class="val">'+(d.meta.approvedBy||'')+'</div></td></tr>'+
      '</tbody></table>'+
      '<table class="grid"><thead><tr>'+
        '<th>SEQUENCE OF BASIC JOB STEPS<div class="small">Beware of being too detailed; record only the information needed to describe each job action. Rule of thumb: no more than 10 steps/task being evaluated.</div></th>'+
        '<th>POTENTIAL ACCIDENTS OR HAZARDS<div class="small">HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</div></th>'+
        '<th>RECOMMENDED SAFE JOB PROCEDURE<div class="small">HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</div></th>'+
      '</tr></thead><tbody>'+
        (d.steps||[]).slice(0,6).map(r=>'<tr><td>'+r.step+'</td><td>'+r.hazards+'</td><td>'+r.procedures+'</td></tr>').join('')+
      '</tbody></table>'+
    '</div>' +
    (d.extraNotes&&d.extraNotes.length? '<div class="page"><div class="brandheader">Environmental Health & Safety</div><ul class="notes">'+d.extraNotes.map(n=>'<li>'+n+'</li>').join('')+'</ul></div>' :'') +
    (d.steps.length > 6 ? 
      '<div class="page">'+
        '<div class="brandheader">Environmental Health & Safety</div>'+
        '<table class="grid"><thead><tr>'+
          '<th>SEQUENCE OF BASIC JOB STEPS<div class="small">Beware of being too detailed, record only the information needed to describe each job action. Rule of thumb, no more than 10 steps/task being evaluated.</div></th>'+
          '<th>POTENTIAL ACCIDENTS OR HAZARDS<div class="small">HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</div></th>'+
          '<th>RECOMMENDED SAFE JOB PROCEDURE<div class="small">HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</div></th>'+
        '</tr></thead><tbody>'+
          d.steps.slice(6).map(r=>'<tr><td>'+r.step+'</td><td>'+r.hazards+'</td><td>'+r.procedures+'</td></tr>').join('')+
          (d.continuationRows && d.continuationRows > 0 ? Array.from({length:d.continuationRows}).map(()=>'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>').join('') : '')+
        '</tbody></table>'+
      '</div>' 
    : (d.steps.length <= 6 && d.continuationRows && d.continuationRows > 0 ?
      '<div class="page">'+
        '<div class="brandheader">Environmental Health & Safety</div>'+
        '<table class="grid"><thead><tr>'+
          '<th>SEQUENCE OF BASIC JOB STEPS<div class="small">Beware of being too detailed, record only the information needed to describe each job action. Rule of thumb, no more than 10 steps/task being evaluated.</div></th>'+
          '<th>POTENTIAL ACCIDENTS OR HAZARDS<div class="small">HAZARD CLASSIFICATION CATEGORIES: Stuck By/Against, Caught In/Between, Slip, Trip, or Fall, Overexertion, Ergonomic (Awkward Postures, Excessive Force, Vibration, Repetitive Motion)</div></th>'+
          '<th>RECOMMENDED SAFE JOB PROCEDURE<div class="small">HAZARD CONTROL CATEGORIES: Engineer Out (New Way to Do, Change Physical Conditions or Work Procedures, Adjust/Modify/Replace Work Components/Tools, Decrease Performance Frequency), Personal Protective Equipment (PPE), Training, Improve Housekeeping.</div></th>'+
        '</tr></thead><tbody>'+
          Array.from({length:d.continuationRows}).map(()=>'<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>').join('')+
        '</tbody></table>'+
      '</div>' 
    : ''))+
    '<div class="page">'+
      '<div class="brandheader">Environmental Health & Safety</div>'+
      '<p class="attest">By signing this Job Hazard Analysis (JHA) I attest that I have read and understand my task, the hazards involved, and recommended safe job procedures and that I will comply with this JHA. That I have been read/translated this JHA in my native language and fully understand the JHA.</p>'+
      '<table class="siggrid"><thead><tr><th>Employee Name (Printed)</th><th>Employee Signature</th></tr></thead><tbody>'+
        (d.signatures||[]).map(s=>'<tr><td>'+s.namePrinted+'</td><td class="sigcell">'+(s.signatureImageUrl?'<img src="'+s.signatureImageUrl+'"/>':'')+'</td></tr>').join('')+
      '</tbody></table>'+
    '</div>'+
  '</div>');
</script>
</body></html>`;

jsaAlamoPdf.post('/jsas/:id/pdf', async (req, res) => {
  try {
    const doc = req.body as JsaAlamoDoc;
    
    const cssPath = path.join(__dirname, '../templates/alamo-print.css');
    const css = fs.readFileSync(cssPath, 'utf8');

    const browser = await puppeteer.launch({ 
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlTemplate(doc, css), { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({ 
      printBackground: true, 
      format: 'Letter', 
      margin: { 
        top: '12mm', 
        right: '12mm', 
        bottom: '12mm', 
        left: '12mm'
      } 
    });
    
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=JSA.pdf');
    res.send(pdf);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});
