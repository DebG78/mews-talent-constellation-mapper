
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";

interface ActionStatusCardProps {
  employees: Employee[];
}

const ActionStatusCard = ({ employees }: ActionStatusCardProps) => {
  const statusDistribution = employees
    .filter(e => e.developmentOptions && e.developmentOptions.length > 0)
    .reduce((acc, employee) => {
      employee.developmentOptions?.forEach(option => {
        acc[option.status] = (acc[option.status] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Action Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{statusDistribution['Completed'] || 0}</div>
        <p className="text-sm text-muted-foreground mb-4">Completed actions</p>
        <div className="text-sm space-y-2">
          <div>In Progress: {statusDistribution['In Progress'] || 0}</div>
          <div>Planned: {statusDistribution['Planned'] || 0}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionStatusCard;
