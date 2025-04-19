
import { ReactNode, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Employee, Readiness, Zone, JobGrade } from "@/types/employee";
import { mockEmployees } from "@/services/mockData";
import TalentMapContext from "@/contexts/TalentMapContext";

interface TalentMapProviderProps {
  children: ReactNode;
}

export const TalentMapProvider = ({ children }: TalentMapProviderProps) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
  const [filter, setFilter] = useState<{
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
    jobGrade: JobGrade;
    hasDevelopmentPlan: boolean;
  }>({
    department: 'All',
    zone: 'All',
    readiness: 'All',
    jobGrade: 'All',
    hasDevelopmentPlan: false,
  });
  
  const [activeTab, setActiveTab] = useState<string>("filters");
  
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const filteredEmployees = employees.filter(emp => {
    if (filter.department !== 'All' && emp.department !== filter.department) return false;
    if (filter.zone !== 'All' && emp.zonePosition.zone !== filter.zone) return false;
    if (filter.readiness !== 'All' && emp.readiness !== filter.readiness) return false;
    if (filter.jobGrade !== 'All' && emp.jobGrade !== filter.jobGrade) return false;
    if (filter.hasDevelopmentPlan && (!emp.developmentOptions || emp.developmentOptions.length === 0)) return false;
    return true;
  });

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetFilters = () => {
    setFilter({
      department: 'All',
      zone: 'All',
      readiness: 'All',
      jobGrade: 'All',
      hasDevelopmentPlan: false,
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setActiveTab("details");
    if (!isPanelVisible) {
      setIsPanelVisible(true);
    }
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setSelectedEmployee(updatedEmployee);
  };

  return (
    <TalentMapContext.Provider 
      value={{
        employees,
        setEmployees,
        selectedEmployee,
        setSelectedEmployee,
        zoom,
        setZoom,
        isPanelVisible,
        setIsPanelVisible,
        filter,
        setFilter,
        activeTab,
        setActiveTab,
        filteredEmployees,
        handleZoomIn,
        handleZoomOut,
        resetFilters,
        handleEmployeeClick,
        togglePanel,
        handleUpdateEmployee
      }}
    >
      {children}
    </TalentMapContext.Provider>
  );
};
