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
}
