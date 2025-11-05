export type Role = 'ADMIN' | 'SUPERVISOR' | 'WORKER' | 'EHS' | 'PM';

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

  signatures: Array<{ 
    namePrinted: string; 
    signatureImageUrl?: string; 
  }>;

  /** Task-specific switches & data captured by AI suggestions or template rules */
  special?: {
    confinedSpace?: {
      requiresPermit: boolean;
      permitNo?: string;
      attendantName?: string;
      rescuePlanVerified?: boolean;
      atmosphericMonitoring?: {
        required: boolean;
        gases: Array<"O2" | "LEL" | "H2S" | "CO" | "Other">;
        readings?: { O2?: string; LEL?: string; H2S?: string; CO?: string; Other?: string };
        acceptableRanges?: { O2?: string; LEL?: string; H2S?: string; CO?: string; Other?: string };
        continuous?: boolean;
        ventilationCFM?: number;
      };
      isolationCompleted?: boolean;
    };
    hotWork?: { 
      permitRequired: boolean; 
      fireWatchMins?: number;
      cleared35ft?: string;
    };
    loto?: { 
      required: boolean;
      pointsVerified?: string;
      zeroVerified?: string;
    };
    craneLift?: { 
      planRequired: boolean;
      qualified?: string;
      powerClearance?: string;
    };
    trafficControl?: { 
      tcpRequired: boolean;
      flaggers?: string;
      lightingPlan?: string;
    };
  };
}
