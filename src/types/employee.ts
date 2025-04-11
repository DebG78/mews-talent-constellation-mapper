
export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  performanceRating: number;
  readiness: 'Ready Now' | 'Ready Soon' | 'Not Ready';
  skillEnablers: SkillEnablers;
  zonePosition: ZonePosition;
  joinDate: string;
  developmentOptions?: DevelopmentOption[];
}

export interface DevelopmentOption {
  id: string;
  title: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  dueDate?: string;
}

export interface SkillEnablers {
  drive: number;
  learningAgility: number;
  innovation: number;
  adaptability: number;
}

export interface ZonePosition {
  x: number;
  y: number;
  zone: 'Acceleration' | 'Development' | 'Support';
}

export type Zone = 'Acceleration' | 'Development' | 'Support';
export type Readiness = 'Ready Now' | 'Ready Soon' | 'Not Ready';
