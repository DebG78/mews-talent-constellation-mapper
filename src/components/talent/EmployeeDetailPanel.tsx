
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import PerformanceRating from "./PerformanceRating";
import SkillEnablersSection from "./SkillEnablersSection";
import DevelopmentSuggestions from "./DevelopmentSuggestions";
import DevelopmentOptions from "./development/DevelopmentOptions";
import EmployeeSnapshotsPanel from "./snapshots/EmployeeSnapshotsPanel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { calculateMomentumScore } from "@/services/momentumService";
import MomentumScoreSection from "./momentum/MomentumScoreSection";
import { getZoneColor, getReadinessColor } from "@/utils/employeeColorUtils";

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

  // Ensure employee has momentum score
  const momentumScore = employee.momentumScore || calculateMomentumScore(employee);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg truncate">{employee.name}</CardTitle>
        <EmployeeSnapshotsPanel 
          employee={employee} 
          onEmployeeUpdate={handleUpdateEmployee}
        />
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

          {/* Momentum Score section now moved below Skill Enablers */}
          <MomentumScoreSection momentumScore={momentumScore} />

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
