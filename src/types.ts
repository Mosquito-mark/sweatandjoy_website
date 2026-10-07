export interface Plan {
  id: 'trial' | 'basic' | 'premium';
  name: string;
  price: number;
  billingPeriod: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export type TrainingEnv = 'Full Gym Access' | 'Home / Minimal Gear' | 'Zero Gear / Bodyweight' | 'Hybrid / Workplace';

export type DemographicGoal =
  | 'Beginner Foundation'
  | 'Post-Physio Recovery'
  | 'Desk Worker Posture'
  | 'Manual Labourer Aches'
  | 'Gender Diverse Journey'
  | 'Senior Joint Vitality'
  | 'Unconventional Goals';

export interface IntakeData {
  planId: 'trial' | 'basic' | 'premium';
  env: TrainingEnv;
  goal: DemographicGoal;
  daysPerWeek: number;
  aches: string[];
  clientName: string;
  clientEmail: string;
  notes: string;
  discountCode?: string;
}

export interface MovementTest {
  id: string;
  title: string;
  area: string;
  description: string;
  instruction: string;
  options: {
    label: string;
    description: string;
    verdict: string;
    wallyAdvice: string;
    correctiveDrills: string[];
  }[];
}

export interface GuestbookEntry {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  badge?: string;
  wallyReply?: string;
}
