import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { TEMPLATES } from "@shared/seeds/templates";
import VoiceButton from "@/voice/VoiceButton";
import { parseCommands } from "@/voice/intent";
import { useToast } from "@/hooks/use-toast";

interface TemplatesPageProps {
  onCreateFromTemplate?: (templateName: string) => void;
}

export default function TemplatesPage({ onCreateFromTemplate }: TemplatesPageProps) {
  const { toast } = useToast();

  const handleVoiceCommand = (text: string) => {
    const intents = parseCommands(text);
    const summary: string[] = [];

    // Look for task/template intent
    const taskIntent = intents.find(i => i.kind === "set_task");
    if (taskIntent && taskIntent.kind === "set_task") {
      const templateName = taskIntent.task;
      const matchedTemplate = TEMPLATES.find(t => 
        t.name.toLowerCase().includes(templateName.toLowerCase())
      );
      
      if (matchedTemplate) {
        summary.push(`✓ Found template: ${matchedTemplate.name}`);
        onCreateFromTemplate?.(matchedTemplate.name);
      } else {
        summary.push(`⚠ No template found for: ${templateName}`);
      }
    }

    if (summary.length > 0) {
      toast({
        title: "Voice Command Processed",
        description: summary.join("\n"),
      });
    } else {
      toast({
        title: "Voice Command",
        description: `Try: "task excavation" or "new task hot work"`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">JSA Templates</h1>
          <p className="text-muted-foreground mt-1">
            Pre-configured safety analysis templates for common construction activities
          </p>
        </div>
        <VoiceButton onTranscript={handleVoiceCommand} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEMPLATES.map((template, index) => (
          <Card key={index} className="glass-card" data-testid={`card-template-${index}`}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {template.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {template.rows.length} job steps · {template.notes?.length || 0} safety notes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Key Steps:</h4>
                <div className="space-y-1">
                  {template.rows.slice(0, 3).map((row) => (
                    <div key={row.order} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-mono">{row.order}.</span>
                      <span>{row.step}</span>
                    </div>
                  ))}
                  {template.rows.length > 3 && (
                    <div className="text-sm text-muted-foreground italic">
                      + {template.rows.length - 3} more steps
                    </div>
                  )}
                </div>
              </div>

              {template.notes && template.notes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Safety Notes:</h4>
                  <div className="text-sm text-muted-foreground">
                    {template.notes[0]}
                    {template.notes.length > 1 && (
                      <span className="italic ml-1">+ {template.notes.length - 1} more</span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Badge variant="secondary" className="text-xs">
                  {template.rows.length} Steps
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Construction
                </Badge>
              </div>

              <Button
                className="w-full"
                onClick={() => onCreateFromTemplate?.(template.name)}
                data-testid={`button-use-template-${index}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Universal PPE Standards</CardTitle>
          <CardDescription>
            These standards are automatically included in all JSAs created from templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm">• Hard hat, safety glasses with side shields, high-visibility vest</li>
            <li className="text-sm">• Work gloves appropriate for task; cut-resistant when handling sharp materials</li>
            <li className="text-sm">• Safety footwear (ASTM F2413) with slip-resistant soles</li>
            <li className="text-sm">• Hearing protection where noise &gt;85 dBA</li>
            <li className="text-sm">• Respiratory protection only if required by task and worker is fit-tested</li>
            <li className="text-sm">• Fall protection when working at heights per local/OSHA rules</li>
            <li className="text-sm">• Task-specific PPE as indicated by JSA</li>
            <li className="text-sm">• All PPE inspected prior to use; defective PPE removed from service</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
