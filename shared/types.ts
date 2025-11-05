export type Role = 'ADMIN' | 'SUPERVISOR' | 'WORKER' | 'EHS' | 'PM';

export interface JsaSignature { 
  namePrinted: string; 
  signatureImageUrl?: string; 
}

export interface JsaAlamoDoc {
  id: string;

  org: { 
    name: string; 
    logoUrl?: string; 
  };

  meta: {
    dateISO: string;
    jobTask: string;
    department?: string;
    section?: string;
    reviewedBy?: string;
    approvedBy?: string;
    analysisBy?: string;
    competentPersons?: string;
  };

  project: {
    name?: string;
    jobNumber?: string;
    location?: string;
    gps?: string;
  };

  ppeStandards: string[];
  
  steps: Array<{
    order: number;
    step: string;
    hazards: string;
    procedures: string;
  }>;

  extraNotes?: string[];
  continuationRows?: number;

  signatures: JsaSignature[];

  special?: {
    confinedSpace?: {
      requiresPermit: boolean;
      permitNo?: string;
      attendantName?: string;
      rescuePlanVerified?: boolean;
      atmosphericMonitoring?: {
        required: boolean;
        gases: Array<'O2' | 'LEL' | 'H2S' | 'CO' | 'Other'>;
        readings?: Partial<Record<'O2' | 'LEL' | 'H2S' | 'CO' | 'Other', string>>;
        acceptableRanges?: Partial<Record<'O2' | 'LEL' | 'H2S' | 'CO' | 'Other', string>>;
        continuous?: boolean;
        ventilationCFM?: number;
      };
      isolationCompleted?: boolean;
    };
    hotWork?: { 
      permitRequired: boolean; 
      fireWatchMins?: number;
      cleared35ft?: 'Yes' | 'No' | 'N/A';
    };
    loto?: { 
      required: boolean;
      pointsVerified?: 'Yes' | 'No';
      zeroVerified?: 'Yes' | 'No';
    };
    craneLift?: { 
      planRequired: boolean;
      qualified?: 'Yes' | 'No';
      powerClearance?: 'Yes' | 'No' | 'N/A';
    };
    trafficControl?: { 
      tcpRequired: boolean;
      flaggers?: 'Yes' | 'No' | 'As Needed';
      lightingPlan?: 'Yes' | 'No' | 'N/A';
    };
  };
}

export type JsaTemplateRow = { 
  order: number; 
  step: string; 
  hazards: string; 
  procedures: string; 
};

export type JsaTemplateSeed = {
  name: string;
  rows: JsaTemplateRow[];
  notes?: string[];
};
