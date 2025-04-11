
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import PerformanceRating from "./PerformanceRating";
import SkillEnablersSection from "./SkillEnablersSection";
import DevelopmentSuggestions from "./DevelopmentSuggestions";

interface EmployeeDetailPanelProps {
  employee: Employee;
}

const EmployeeDetailPanel = ({ employee }: EmployeeDetailPanelProps) => {
  // Get zone color
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Acceleration':
        return 'bg-acceleration text-white';
      case 'Development':
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{employee.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EmployeeBasicInfo 
          employee={employee} 
          getZoneColor={getZoneColor} 
          getReadinessColor={getReadinessColor} 
        />

        <PerformanceRating rating={employee.performanceRating} />

        <SkillEnablersSection skillEnablers={employee.skillEnablers} />

        <DevelopmentSuggestions zone={employee.zonePosition.zone} />
      </CardContent>
    </Card>
  );
};

export default EmployeeDetailPanel;
