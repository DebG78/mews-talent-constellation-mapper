
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import PerformanceRating from "./PerformanceRating";
import SkillEnablersSection from "./SkillEnablersSection";
import DevelopmentSuggestions from "./DevelopmentSuggestions";
import DevelopmentOptions from "./development/DevelopmentOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface EmployeeDetailPanelProps {
  employee: Employee;
  onUpdateEmployee?: (updatedEmployee: Employee) => void;
}

const EmployeeDetailPanel = ({ 
  employee: initialEmployee, 
  onUpdateEmployee 
}: EmployeeDetailPanelProps) => {
  const [employee, setEmployee] = useState<Employee>(initialEmployee);
  
  // Update local state when prop changes
  useEffect(() => {
    setEmployee(initialEmployee);
  }, [initialEmployee]);

  // Update employee when development options change
  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployee(updatedEmployee);
    if (onUpdateEmployee) {
      onUpdateEmployee(updatedEmployee);
    }
  };

  // Get zone color
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Acceleration':
        return 'bg-acceleration text-white';
      case 'Growth':
        return 'bg-development text-white';
      case 'Support':
        return 'bg-support text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Get readiness color
  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'Ready Now':
        return 'bg-ready-now text-white';
      case 'Ready Soon':
        return 'bg-ready-soon text-white';
      case 'Not Ready':
        return 'bg-not-ready text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg truncate">{employee.name}</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[calc(100%-60px)]">
        <CardContent className="space-y-4 px-4">
          <EmployeeBasicInfo 
            employee={employee} 
            getZoneColor={getZoneColor} 
            getReadinessColor={getReadinessColor} 
          />

          <PerformanceRating rating={employee.performanceRating} />

          <SkillEnablersSection skillEnablers={employee.skillEnablers} />

          <DevelopmentOptions 
            employee={employee}
            onUpdate={handleUpdateEmployee}
          />

          <DevelopmentSuggestions zone={employee.zonePosition.zone} />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default EmployeeDetailPanel;
