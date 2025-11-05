import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, FileDown } from "lucide-react";
import PrintableJSA_Alamo from "./PrintableJSA_Alamo";
import { SAMPLE_JSA_CONCRETE } from "../../../shared/jsa.sample.concrete";

export default function JsaViewPage() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const response = await fetch(`/api/jsas/${SAMPLE_JSA_CONCRETE.id}/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(SAMPLE_JSA_CONCRETE),
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
          <CardTitle>JSA Document: {SAMPLE_JSA_CONCRETE.meta.jobTask}</CardTitle>
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

      <PrintableJSA_Alamo doc={SAMPLE_JSA_CONCRETE} />
    </div>
  );
}
