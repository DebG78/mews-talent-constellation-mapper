
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/employee";
import { User, Building, CalendarDays } from "lucide-react";
import { getZoneColor, getReadinessColor } from "@/utils/employeeColorUtils";

interface EmployeeBasicInfoProps {
  employee: Employee;
  getZoneColor: (zone: string) => string;
  getReadinessColor: (readiness: string) => string;
}

const EmployeeBasicInfo = ({ employee, getZoneColor, getReadinessColor }: EmployeeBasicInfoProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <User size={14} className="mr-1" />
          {employee.position}
        </div>
        <Badge variant="outline" className={getZoneColor(employee.zonePosition.zone)}>
          {employee.zonePosition.zone} Zone
        </Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Building size={14} className="mr-1" />
          {employee.department}
        </div>
        <Badge variant="outline" className={getReadinessColor(employee.readiness)}>
          {employee.readiness}
        </Badge>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <CalendarDays size={14} className="mr-1" />
        Joined: {employee.joinDate}
      </div>
    </div>
  );
};

export default EmployeeBasicInfo;
