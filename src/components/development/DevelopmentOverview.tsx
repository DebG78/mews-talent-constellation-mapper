
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DevelopmentOverviewProps {
  employees: Employee[];
}

const DevelopmentOverview = ({ employees }: DevelopmentOverviewProps) => {
  const employeesWithDevelopment = employees.filter(e => 
    e.developmentOptions && e.developmentOptions.length > 0
  );
  
  const totalWithDevelopment = employeesWithDevelopment.length;
  const percentageWithDevelopment = Math.round((totalWithDevelopment / employees.length) * 100);
  
  const statusDistribution = employeesWithDevelopment.reduce((acc, employee) => {
    employee.developmentOptions?.forEach(option => {
      acc[option.status] = (acc[option.status] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Planned', value: statusDistribution['Planned'] || 0 },
    { name: 'In Progress', value: statusDistribution['In Progress'] || 0 },
    { name: 'Completed', value: statusDistribution['Completed'] || 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Development Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-3xl font-bold">{percentageWithDevelopment}%</div>
            <Progress value={percentageWithDevelopment} />
            <p className="text-sm text-muted-foreground">
              {totalWithDevelopment} out of {employees.length} employees have development plans
            </p>
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0088CC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentOverview;
