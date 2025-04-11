
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Employee } from "@/types/employee";
import { CalendarDays, User, Building, BarChart, Gauge } from "lucide-react";

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

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium flex items-center">
              <BarChart size={14} className="mr-1" />
              Performance Rating
            </span>
            <span className="text-sm font-semibold">{employee.performanceRating}/5</span>
          </div>
          <Progress value={employee.performanceRating * 20} className="h-2" />
        </div>

        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-medium flex items-center">
            <Gauge size={14} className="mr-1" />
            Skill Enablers
          </h4>
          
          <div className="space-y-3">
            <SkillEnablerBar 
              label="Drive" 
              value={employee.skillEnablers.drive} 
              color="bg-blue-500" 
            />
            <SkillEnablerBar 
              label="Learning Agility" 
              value={employee.skillEnablers.learningAgility} 
              color="bg-green-500" 
            />
            <SkillEnablerBar 
              label="Innovation" 
              value={employee.skillEnablers.innovation} 
              color="bg-purple-500" 
            />
            <SkillEnablerBar 
              label="Adaptability" 
              value={employee.skillEnablers.adaptability} 
              color="bg-orange-500" 
            />
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <h4 className="text-sm font-medium">Development Suggestions</h4>
          {employee.zonePosition.zone === 'Acceleration' && (
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
              <li>Leadership mentoring program</li>
              <li>Cross-functional project leadership</li>
              <li>Executive shadowing opportunity</li>
            </ul>
          )}
          
          {employee.zonePosition.zone === 'Development' && (
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
              <li>Stretch assignments in current role</li>
              <li>Targeted skill development workshops</li>
              <li>Peer learning groups</li>
            </ul>
          )}
          
          {employee.zonePosition.zone === 'Support' && (
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
              <li>Performance improvement plan</li>
              <li>Core skills training</li>
              <li>Regular coaching sessions</li>
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface SkillEnablerBarProps {
  label: string;
  value: number;
  color: string;
}

const SkillEnablerBar = ({ label, value, color }: SkillEnablerBarProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/5</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${value * 20}%` }}
        />
      </div>
    </div>
  );
};

export default EmployeeDetailPanel;
