
import { Employee } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserMinus } from "lucide-react";

interface DevelopmentGapsAnalysisProps {
  employees: Employee[];
}

const DevelopmentGapsAnalysis = ({ employees }: DevelopmentGapsAnalysisProps) => {
  // Find employees with no development plans
  const employeesWithoutPlans = employees.filter(
    e => !e.developmentOptions || e.developmentOptions.length === 0
  );

  // Find employees with stalled development (no completed actions)
  const employeesWithStalledDevelopment = employees.filter(
    e => e.developmentOptions && 
        e.developmentOptions.length > 0 && 
        !e.developmentOptions.some(opt => opt.status === 'Completed')
  );

  // Group gaps by department
  const departmentGaps = employeesWithoutPlans.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserMinus className="h-5 w-5" />
          <CardTitle>Development Gaps Analysis</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Critical Gaps</AlertTitle>
          <AlertDescription>
            {employeesWithoutPlans.length} employees have no development plans
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <h4 className="font-semibold">Gaps by Department</h4>
          <div className="grid gap-2">
            {Object.entries(departmentGaps).map(([department, count]) => (
              <div 
                key={department}
                className="flex items-center justify-between p-2 rounded-lg bg-muted"
              >
                <span>{department}</span>
                <span className="font-medium">{count} employees</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Stalled Development</h4>
          <p className="text-sm text-muted-foreground">
            {employeesWithStalledDevelopment.length} employees have active plans but no completed actions
          </p>
          <div className="mt-2">
            {employeesWithStalledDevelopment.slice(0, 5).map(employee => (
              <div 
                key={employee.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span>{employee.name}</span>
                <span className="text-sm text-muted-foreground">{employee.department}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentGapsAnalysis;
