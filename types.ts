
export type View = 'dashboard' | 'creator';
export type Language = 'id' | 'en';

export interface Template {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: React.ElementType;
}

export interface FormData {
  partyOneName: string;
  partyOnePosition: string;
  partyOneAddress: string;
  partyTwoName: string;
  partyTwoPosition: string;
  partyTwoAddress: string;
  projectTitle: string;
  scope: string;
  value: string;
  startDate: string;
  endDate: string;
  additionalTerms: string;
}

export interface GeneratedContract {
  title: string;
  opening: string;
  parties: { id: string; details: string }[];
  preamble: string;
  clauses: { title: string; content: string }[];
  closing: string;
  signatures: { party: string; name: string }[];
}

export interface MockContract {
  id: string;
  title: string;
  parties: string;
  date: string;
  status: 'active' | 'expired';
}
