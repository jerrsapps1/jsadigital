import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, FileDown } from "lucide-react";
import PrintableJSA_Alamo from "./PrintableJSA_Alamo";
import type { JsaAlamoDoc } from "../../../shared/jsaAlamoTypes";

const sampleJsaDoc: JsaAlamoDoc = {
  id: "jsa-001",
  org: {
    name: "Acme Construction",
    logoUrl: undefined,
  },
  meta: {
    dateISO: "2025-01-15",
    jobTask: "Asbestos Abatement at Life Tower Project #2025-001",
    department: "Environmental Health & Safety",
    section: "Hazardous Materials",
    reviewedBy: "Jane Smith, EHS Manager",
    approvedBy: "John Doe, Safety Director",
    analysisBy: "Joe Medrano",
    competentPersons: "Joe Medrano, Steve Darty",
  },
  project: {
    name: "Life Tower Renovation",
    jobNumber: "2025-001",
    location: "Life Tower, 200 N. San Pedro St, San Antonio, TX 78205",
    gps: "29.4241° N, 98.4936° W",
  },
  ppeStandards: [
    "ANSI Z87.1 - Safety Glasses with Side Shields",
    "ANSI/ISEA 107 - High Visibility Safety Vest",
    "ASTM F2412/F2413 - Steel Toe Safety Boots",
    "29 CFR 1926.95 - Hard Hat (Class E)",
    "NIOSH-approved Respirator (P100 filters for asbestos work)",
    "Disposable Coveralls (Tyvek or equivalent)",
    "Nitrile Gloves",
  ],
  steps: [
    {
      order: 1,
      step: "Conduct pre-work site inspection and establish containment area",
      hazards: "Slip/Trip hazards from equipment setup, exposure to airborne fibers before containment",
      procedures: "Walk perimeter, identify trip hazards. Mark all entrances. Set up barricades and warning signs. Verify negative air pressure before entering.",
    },
    {
      order: 2,
      step: "Don appropriate PPE and enter containment area",
      hazards: "Heat stress from full PPE in enclosed space, improper seal leading to exposure",
      procedures: "Perform fit check on respirator. Verify coverall integrity. Buddy system - never enter alone. Monitor for signs of heat exhaustion.",
    },
    {
      order: 3,
      step: "Wet asbestos material using amended water",
      hazards: "Electrical shock from water near power sources, inadequate wetting leading to fiber release",
      procedures: "LOTO all electrical sources in work area. Use GFCI-protected equipment. Apply water with surfactant until material is saturated. Verify saturation before cutting.",
    },
    {
      order: 4,
      step: "Carefully remove asbestos-containing material",
      hazards: "Fiber release from dry material, cut injuries from sharp edges, overexertion from awkward positions",
      procedures: "Keep material wet at all times. Use hand tools - no power tools unless approved. Cut in manageable sections. Maintain proper lifting posture. Take breaks every 30 minutes.",
    },
    {
      order: 5,
      step: "Double-bag waste in 6-mil polyethylene bags",
      hazards: "Bag puncture leading to fiber release, repetitive motion injuries",
      procedures: "Inspect bags for damage before use. Place material gently - don't overfill. Seal inner bag, decontaminate exterior, place in outer bag. Label with asbestos warning.",
    },
    {
      order: 6,
      step: "Exit containment through decontamination unit",
      hazards: "Cross-contamination if decon procedures not followed, slip hazard from wet surfaces",
      procedures: "Follow 3-stage decon: 1) Equipment room 2) Shower 3) Clean room. Remove PPE in reverse order of donning. Bag contaminated PPE separately. Shower minimum 5 minutes.",
    },
  ],
  extraNotes: [
    "All workers must complete 40-hour OSHA Asbestos Abatement training and current medical clearance for respirator use",
    "Air monitoring will be conducted by certified industrial hygienist throughout project duration",
    "Negative air machines must maintain -0.02 inches water column minimum pressure differential",
    "No eating, drinking, or smoking within 100 feet of containment area",
    "Emergency eyewash and shower station located at building entrance - verify operation daily",
    "Waste transport manifest required - coordinate with licensed disposal facility before project start",
  ],
  continuationRows: 10,
  signatures: [
    { namePrinted: "Joe Medrano", signatureImageUrl: undefined },
    { namePrinted: "Steve Darty", signatureImageUrl: undefined },
    { namePrinted: "Mike Johnson", signatureImageUrl: undefined },
    { namePrinted: "Sarah Williams", signatureImageUrl: undefined },
  ],
};

export default function JsaViewPage() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const response = await fetch(`/api/jsas/${sampleJsaDoc.id}/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleJsaDoc),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card no-print">
        <CardHeader>
          <CardTitle>JSA Document: {sampleJsaDoc.meta.jobTask}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button
            onClick={handlePrint}
            variant="outline"
            data-testid="button-print"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleGeneratePdf}
            disabled={isGeneratingPdf}
            data-testid="button-generate-pdf"
          >
            <FileDown className="h-4 w-4 mr-2" />
            {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
          </Button>
        </CardContent>
      </Card>

      <PrintableJSA_Alamo doc={sampleJsaDoc} />
    </div>
  );
}
