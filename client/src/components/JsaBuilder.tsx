import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GripVertical, Trash2, Plus, Save, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobStep {
  id: string;
  description: string;
}

interface Hazard {
  id: string;
  description: string;
  type: string;
}

interface Control {
  id: string;
  description: string;
}

interface JsaBuilderProps {
  onSave?: (data: any) => void;
  onSubmit?: (data: any) => void;
}

export default function JsaBuilder({ onSave, onSubmit }: JsaBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [jobSteps, setJobSteps] = useState<JobStep[]>([{ id: "1", description: "" }]);
  const [hazards, setHazards] = useState<Hazard[]>([{ id: "1", description: "", type: "" }]);
  const [controls, setControls] = useState<Control[]>([{ id: "1", description: "" }]);
  const [autoSaved, setAutoSaved] = useState(false);

  const steps = [
    { number: 1, label: "Details" },
    { number: 2, label: "Job Steps" },
    { number: 3, label: "Hazards" },
    { number: 4, label: "Controls" },
    { number: 5, label: "Review" }
  ];

  const addJobStep = () => {
    setJobSteps([...jobSteps, { id: Date.now().toString(), description: "" }]);
  };

  const removeJobStep = (id: string) => {
    setJobSteps(jobSteps.filter(step => step.id !== id));
  };

  const updateJobStep = (id: string, description: string) => {
    setJobSteps(jobSteps.map(step => 
      step.id === id ? { ...step, description } : step
    ));
  };

  const addHazard = () => {
    setHazards([...hazards, { id: Date.now().toString(), description: "", type: "" }]);
  };

  const removeHazard = (id: string) => {
    setHazards(hazards.filter(hazard => hazard.id !== id));
  };

  const updateHazard = (id: string, field: keyof Hazard, value: string) => {
    setHazards(hazards.map(hazard => 
      hazard.id === id ? { ...hazard, [field]: value } : hazard
    ));
  };

  const addControl = () => {
    setControls([...controls, { id: Date.now().toString(), description: "" }]);
  };

  const removeControl = (id: string) => {
    setControls(controls.filter(control => control.id !== id));
  };

  const updateControl = (id: string, description: string) => {
    setControls(controls.map(control => 
      control.id === id ? { ...control, description } : control
    ));
  };

  const handleSaveDraft = () => {
    const data = { title, project, jobSteps, hazards, controls };
    onSave?.(data);
    setAutoSaved(true);
    setTimeout(() => setAutoSaved(false), 2000);
    console.log('Draft saved:', data);
  };

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const data = { title, project, jobSteps, hazards, controls };
    onSubmit?.(data);
    console.log('JSA submitted for sign-off:', data);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8" data-testid="container-jsa-builder">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep === step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep > step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                data-testid={`step-indicator-${step.number}`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 ${currentStep > step.number ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        {autoSaved && (
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✓ Saved
          </Badge>
        )}
      </div>

      <Card className="glass-card p-8">
        <CardHeader className="px-0 pt-0">
          <CardTitle>{steps[currentStep - 1].label}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">JSA Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Trenching Safety - Main Street"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  data-testid="input-jsa-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Select value={project} onValueChange={setProject}>
                  <SelectTrigger id="project" data-testid="select-project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown-demo">Downtown Demo</SelectItem>
                    <SelectItem value="acme-tower">Acme Tower</SelectItem>
                    <SelectItem value="bridge-project">Bridge Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              {jobSteps.map((step, index) => (
                <Card key={step.id} className="glass-card p-4" data-testid={`card-job-step-${index}`}>
                  <div className="flex gap-3">
                    <div className="flex items-center">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    </div>
                    <Badge variant="outline" className="h-6">{index + 1}</Badge>
                    <Textarea
                      placeholder="Describe the job step..."
                      value={step.description}
                      onChange={(e) => updateJobStep(step.id, e.target.value)}
                      className="flex-1 resize-none"
                      rows={2}
                      data-testid={`input-job-step-${index}`}
                    />
                    {jobSteps.length > 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeJobStep(step.id)}
                        data-testid={`button-remove-step-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={addJobStep}
                className="w-full"
                data-testid="button-add-job-step"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              {hazards.map((hazard, index) => (
                <Card key={hazard.id} className="glass-card p-4" data-testid={`card-hazard-${index}`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="h-6 mt-2">{index + 1}</Badge>
                      <div className="flex-1 space-y-3">
                        <Select value={hazard.type} onValueChange={(value) => updateHazard(hazard.id, 'type', value)}>
                          <SelectTrigger data-testid={`select-hazard-type-${index}`}>
                            <SelectValue placeholder="Select hazard type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fall">Fall Hazards</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="slip">Slips & Trips</SelectItem>
                            <SelectItem value="machinery">Heavy Machinery</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Describe the hazard..."
                          value={hazard.description}
                          onChange={(e) => updateHazard(hazard.id, 'description', e.target.value)}
                          className="resize-none"
                          rows={2}
                          data-testid={`input-hazard-description-${index}`}
                        />
                      </div>
                      {hazards.length > 1 && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeHazard(hazard.id)}
                          data-testid={`button-remove-hazard-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={addHazard}
                className="w-full"
                data-testid="button-add-hazard"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Hazard
              </Button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              {controls.map((control, index) => (
                <Card key={control.id} className="glass-card p-4" data-testid={`card-control-${index}`}>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="h-6">{index + 1}</Badge>
                    <Textarea
                      placeholder="Describe the control measure..."
                      value={control.description}
                      onChange={(e) => updateControl(control.id, e.target.value)}
                      className="flex-1 resize-none"
                      rows={2}
                      data-testid={`input-control-${index}`}
                    />
                    {controls.length > 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeControl(control.id)}
                        data-testid={`button-remove-control-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={addControl}
                className="w-full"
                data-testid="button-add-control"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Control
              </Button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">JSA Details</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Title:</span> {title}</p>
                  <p><span className="text-muted-foreground">Project:</span> {project}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Job Steps ({jobSteps.length})</h3>
                <div className="space-y-1 text-sm">
                  {jobSteps.map((step, i) => (
                    <p key={step.id}>
                      <span className="text-muted-foreground">{i + 1}.</span> {step.description}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Hazards ({hazards.length})</h3>
                <div className="space-y-2 text-sm">
                  {hazards.map((hazard, i) => (
                    <div key={hazard.id}>
                      <Badge variant="outline" className="mb-1">{hazard.type}</Badge>
                      <p className="text-muted-foreground ml-2">{hazard.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Controls ({controls.length})</h3>
                <div className="space-y-1 text-sm">
                  {controls.map((control, i) => (
                    <p key={control.id}>
                      <span className="text-muted-foreground">{i + 1}.</span> {control.description}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} data-testid="button-back">
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            data-testid="button-save-draft"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          {currentStep < 5 ? (
            <Button onClick={handleContinue} data-testid="button-continue">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} data-testid="button-submit">
              <Send className="h-4 w-4 mr-2" />
              Submit for Sign-off
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}