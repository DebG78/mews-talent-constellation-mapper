
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
  jobGrade?: 'IC' | 'Manager';
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
  zone: 'Acceleration' | 'Growth' | 'Support';
}

export type Zone = 'Acceleration' | 'Growth' | 'Support';
export type Readiness = 'Ready Now' | 'Ready Soon' | 'Not Ready';
export type JobGrade = 'IC' | 'Manager' | 'All';
