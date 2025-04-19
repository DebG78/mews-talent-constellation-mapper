
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

interface DepartmentCompletionProps {
  employees: Employee[];
}

const DepartmentCompletion = ({ employees }: DepartmentCompletionProps) => {
  const departmentStats = employees.reduce((acc, employee) => {
    const dept = employee.department;
    if (!acc[dept]) {
      acc[dept] = { total: 0, completed: 0 };
    }
    
    employee.developmentOptions?.forEach(option => {
      acc[dept].total++;
      if (option.status === 'Completed') {
        acc[dept].completed++;
      }
    });
    
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Completion Rate by Department
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(departmentStats).map(([dept, stats]) => {
            const percentage = Math.round((stats.completed / stats.total) * 100) || 0;
            return (
              <div key={dept} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{dept}</span>
                  <span>{percentage}%</span>
                </div>
                <Progress value={percentage} />
                <p className="text-xs text-muted-foreground">
                  {stats.completed} of {stats.total} actions completed
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentCompletion;
