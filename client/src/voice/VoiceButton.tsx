import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Keyboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
}

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const [recording, setRecording] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textCommand, setTextCommand] = useState("");
  const recRef = useRef<any>(null);

  useEffect(() => {
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SR) {
      recRef.current = new SR();
      recRef.current.lang = "en-US";
      recRef.current.interimResults = false;
      recRef.current.maxAlternatives = 1;
      recRef.current.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        onTranscript(text);
      };
      recRef.current.onend = () => setRecording(false);
    }
  }, [onTranscript]);

  const toggleRecording = () => {
    if (!recRef.current) {
      alert("Speech recognition not supported in this browser. Use the text command option instead.");
      setShowTextInput(true);
      return;
    }
    if (recording) {
      recRef.current.stop();
      setRecording(false);
    } else {
      setRecording(true);
      recRef.current.start();
    }
  };

  const handleTextSubmit = () => {
    if (textCommand.trim()) {
      onTranscript(textCommand);
      setTextCommand("");
    }
  };

  return (
    <div className="no-print space-y-3">
      <div className="flex items-center gap-2">
        <Button
          variant={recording ? "destructive" : "outline"}
          size="sm"
          onClick={toggleRecording}
          data-testid="button-voice-command"
          className="gap-2"
        >
          {recording ? (
            <>
              <MicOff className="h-4 w-4" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" />
              Voice Command
            </>
          )}
        </Button>
        
        <Collapsible open={showTextInput} onOpenChange={setShowTextInput}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" data-testid="button-toggle-text-command">
              <Keyboard className="h-4 w-4 mr-2" />
              {showTextInput ? "Hide" : "Type"} Command
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Type Voice Command</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Textarea
                  rows={3}
                  placeholder='Example: "same project, new task concrete pour; add step pump setup; toggle hot work; finish"'
                  value={textCommand}
                  onChange={(e) => setTextCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      handleTextSubmit();
                    }
                  }}
                  data-testid="input-text-command"
                />
                <Button 
                  onClick={handleTextSubmit} 
                  disabled={!textCommand.trim()}
                  size="sm"
                  data-testid="button-submit-text-command"
                >
                  Execute Command
                </Button>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {recording && (
        <div className="text-sm text-muted-foreground animate-pulse">
          🎤 Listening...
        </div>
      )}
    </div>
  );
}
