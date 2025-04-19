
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface ActiveDevelopmentPlansProps {
  employees: Employee[];
}

const ActiveDevelopmentPlans = ({ employees }: ActiveDevelopmentPlansProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const employeesWithPlans = employees
    .filter(e => e.developmentOptions && e.developmentOptions.length > 0)
    .sort((a, b) => (b.developmentOptions?.length || 0) - (a.developmentOptions?.length || 0));

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
    <Card>
      <CardHeader>
        <CardTitle>Active Development Plans</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total Actions</TableHead>
              <TableHead>In Progress</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Completion Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeesWithPlans.map((employee) => {
              const total = employee.developmentOptions?.length || 0;
              const inProgress = employee.developmentOptions?.filter(o => o.status === 'In Progress').length || 0;
              const completed = employee.developmentOptions?.filter(o => o.status === 'Completed').length || 0;
              const completionRate = Math.round((completed / total) * 100);

              return (
                <TableRow 
                  key={employee.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{total}</TableCell>
                  <TableCell>{inProgress}</TableCell>
                  <TableCell>{completed}</TableCell>
                  <TableCell>{completionRate}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

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

export default ActiveDevelopmentPlans;
