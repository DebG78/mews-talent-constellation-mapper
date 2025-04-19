
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusDistributionChartProps {
  employees: Employee[];
}

const StatusDistributionChart = ({ employees }: StatusDistributionChartProps) => {
  const statusDistribution = employees
    .filter(e => e.developmentOptions && e.developmentOptions.length > 0)
    .reduce((acc, employee) => {
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
  );
};

export default StatusDistributionChart;
