
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { CalendarDays } from "lucide-react";

interface DevelopmentCalendarProps {
  employees: Employee[];
}

const DevelopmentCalendar = ({ employees }: DevelopmentCalendarProps) => {
  const upcomingDeadlines = employees
    .flatMap(employee => 
      employee.developmentOptions?.map(option => ({
        employeeName: employee.name,
        ...option
      })) || []
    )
    .filter(action => action.status !== 'Completed' && action.dueDate)
    .sort((a, b) => 
      new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()
    )
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Upcoming Development Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDeadlines.map((action, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <p className="font-medium">{action.title}</p>
                <p className="text-sm text-muted-foreground">{action.employeeName}</p>
              </div>
              <div className="text-sm">
                Due: {action.dueDate}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentCalendar;
