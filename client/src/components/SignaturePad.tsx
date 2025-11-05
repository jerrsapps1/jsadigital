import { useRef, useEffect, useState } from "react";
import SignaturePadLib from "signature_pad";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear?: () => void;
  savedSignature?: string;
  signerName?: string;
  timestamp?: string;
  gpsCoordinates?: { lat: number; lng: number };
}

export default function SignaturePad({ 
  onSave, 
  onClear,
  savedSignature,
  signerName,
  timestamp,
  gpsCoordinates
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePadLib | null>(null);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const signaturePad = new SignaturePadLib(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
      });
      signaturePadRef.current = signaturePad;

      const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        if (canvasRef.current) {
          canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
          canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
          canvasRef.current.getContext("2d")?.scale(ratio, ratio);
          signaturePad.clear();
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, []);

  const handleClear = () => {
    signaturePadRef.current?.clear();
    setIsSigned(false);
    onClear?.();
  };

  const handleConfirm = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const dataUrl = signaturePadRef.current.toDataURL();
      onSave(dataUrl);
      setIsSigned(true);
    }
  };

  if (savedSignature) {
    return (
      <Card className="p-4" data-testid="card-signature-preview">
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <img 
              src={savedSignature} 
              alt="Signature" 
              className="h-16 border rounded-md bg-white"
              data-testid="img-signature"
            />
            <div className="flex-1 text-sm">
              {signerName && (
                <p className="font-medium" data-testid="text-signer-name">{signerName}</p>
              )}
              {timestamp && (
                <p className="text-muted-foreground font-mono" data-testid="text-signature-timestamp">
                  {timestamp}
                </p>
              )}
              {gpsCoordinates && (
                <p className="text-muted-foreground text-xs font-mono" data-testid="text-signature-gps">
                  GPS: {gpsCoordinates.lat.toFixed(6)}, {gpsCoordinates.lng.toFixed(6)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4" data-testid="card-signature-pad">
      <div className="space-y-3">
        <canvas
          ref={canvasRef}
          className="w-full h-40 border border-input rounded-md"
          data-testid="canvas-signature"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            data-testid="button-clear-signature"
          >
            Clear
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!signaturePadRef.current || signaturePadRef.current.isEmpty()}
            data-testid="button-confirm-signature"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Card>
  );
}