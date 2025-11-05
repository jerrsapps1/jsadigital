import { useState } from 'react';
import SignaturePad from '../SignaturePad';

export default function SignaturePadExample() {
  const [signature, setSignature] = useState<string | null>(null);

  return (
    <div className="max-w-3xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sign Below</h3>
        <SignaturePad 
          onSave={(dataUrl) => {
            console.log('Signature saved:', dataUrl.substring(0, 50) + '...');
            setSignature(dataUrl);
          }}
          onClear={() => {
            console.log('Signature cleared');
            setSignature(null);
          }}
        />
      </div>
      
      {signature && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Saved Signature</h3>
          <SignaturePad 
            onSave={() => {}}
            savedSignature={signature}
            signerName="John Doe"
            timestamp={new Date().toLocaleString()}
            gpsCoordinates={{ lat: 40.7128, lng: -74.0060 }}
          />
        </div>
      )}
    </div>
  );
}