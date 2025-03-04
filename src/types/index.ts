export interface Symptoms {
  sleepDisruption: boolean;
  shortnessOfBreath: boolean;
  swelling: boolean;
  jawPain: boolean;
  fatigue: boolean;
  coldSweats: boolean;
  dizziness: boolean;
  leftHandPain: boolean;
}

export type ChestPainType = 'typical' | 'atypical' | 'nonAnginal' | 'asymptomatic';
export type ThalType = 'normal' | 'fixedDefect' | 'reversibleDefect';
export type SlopeType = 'upsloping' | 'flat' | 'downsloping';

export interface DetailedAssessment {
  age: number;
  sex: 'male' | 'female';
  chestPainType: ChestPainType;
  restingECG: string;
  fastingBloodSugar: number;
  cholesterol: number;
  bloodPressure: number;
  maxHeartRate: number;
  exerciseAngina: boolean;
  oldpeak: number;
  slope: SlopeType;
  coloredVessels: number;
  thal: ThalType;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}