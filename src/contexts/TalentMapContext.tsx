
import { createContext, useContext, useState } from "react";
import { Employee, Readiness, Zone, JobGrade } from "@/types/employee";

interface TalentMapContextType {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  isPanelVisible: boolean;
  setIsPanelVisible: (isVisible: boolean) => void;
  filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
    jobGrade: JobGrade;
    hasDevelopmentPlan: boolean;
  };
  setFilter: (filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
    jobGrade: JobGrade;
    hasDevelopmentPlan: boolean;
  }) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredEmployees: Employee[];
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  resetFilters: () => void;
  handleEmployeeClick: (employee: Employee) => void;
  togglePanel: () => void;
  handleUpdateEmployee: (updatedEmployee: Employee) => void;
}

const TalentMapContext = createContext<TalentMapContextType | undefined>(undefined);

export const useTalentMap = () => {
  const context = useContext(TalentMapContext);
  if (!context) {
    throw new Error("useTalentMap must be used within a TalentMapProvider");
  }
  return context;
};

export default TalentMapContext;
