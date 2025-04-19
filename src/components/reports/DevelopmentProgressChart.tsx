import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/services/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Employee } from "@/types/employee";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DevelopmentProgressChartProps {
  employees?: Employee[];
}

const DevelopmentProgressChart = ({ employees = mockEmployees }: DevelopmentProgressChartProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Calculate statistics
  const employeesWithDevelopment = employees.filter(e => 
    e.developmentOptions && e.developmentOptions.length > 0
  );
  
  const totalWithDevelopment = employeesWithDevelopment.length;
  const percentageWithDevelopment = Math.round((totalWithDevelopment / employees.length) * 100);
  
  // Calculate status distribution
  const statusDistribution = employeesWithDevelopment.reduce((acc, employee) => {
    employee.developmentOptions?.forEach(option => {
      acc[option.status] = (acc[option.status] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Format data for bar chart
  const chartData = [
    { name: 'Planned', value: statusDistribution['Planned'] || 0 },
    { name: 'In Progress', value: statusDistribution['In Progress'] || 0 },
    { name: 'Completed', value: statusDistribution['Completed'] || 0 },
  ];

  // Get top 5 employees with most development actions
  const topEmployees = [...employeesWithDevelopment]
    .sort((a, b) => (b.developmentOptions?.length || 0) - (a.developmentOptions?.length || 0))
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Development Actions Progress</CardTitle>
        <CardDescription>
          Overview of development actions across the organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-xl">{totalWithDevelopment}</CardTitle>
              <CardDescription>Employees with Development Plans</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-xl">{percentageWithDevelopment}%</CardTitle>
              <CardDescription>Coverage Rate</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-xl">
                {statusDistribution['Completed'] || 0}
              </CardTitle>
              <CardDescription>Completed Actions</CardDescription>
            </CardHeader>
          </Card>
        </div>

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

        <div>
          <h4 className="text-sm font-medium mb-4">Top Employees by Development Actions</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topEmployees.map((employee) => {
                const total = employee.developmentOptions?.length || 0;
                const completed = employee.developmentOptions?.filter(
                  o => o.status === 'Completed'
                ).length || 0;
                const progressPercent = Math.round((completed / total) * 100);
                
                return (
                  <TableRow 
                    key={employee.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{total}</TableCell>
                    <TableCell className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <Progress value={progressPercent} className="w-[60%]" />
                        <span className="text-sm text-muted-foreground">
                          {progressPercent}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Development Actions for {selectedEmployee?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedEmployee?.developmentOptions?.map((option) => (
                <Card key={option.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{option.title}</h4>
                    <Badge className={getStatusColor(option.status)}>{option.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {option.dueDate && (
                      <div className="flex items-center mr-4">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        Due: {option.dueDate}
                      </div>
                    )}
                    <div className="flex items-center">
                      {option.status === 'Planned' && <Clock className="h-4 w-4 mr-1" />}
                      {option.status === 'In Progress' && <Clock className="h-4 w-4 mr-1" />}
                      {option.status === 'Completed' && <Check className="h-4 w-4 mr-1" />}
                      Status: {option.status}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DevelopmentProgressChart;
