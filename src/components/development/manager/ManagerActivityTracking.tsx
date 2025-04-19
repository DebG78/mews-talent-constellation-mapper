
import { Employee } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus } from "lucide-react";

interface ManagerActivityTrackingProps {
  employees: Employee[];
}

const ManagerActivityTracking = ({ employees }: ManagerActivityTrackingProps) => {
  // Group employees by department and calculate development metrics
  const managerStats = employees.reduce((acc, employee) => {
    const department = employee.department;
    if (!acc[department]) {
      acc[department] = {
        totalEmployees: 0,
        activeDevPlans: 0,
        completedActions: 0,
      };
    }

    acc[department].totalEmployees++;
    if (employee.developmentOptions && employee.developmentOptions.length > 0) {
      acc[department].activeDevPlans++;
      acc[department].completedActions += employee.developmentOptions.filter(
        opt => opt.status === 'Completed'
      ).length;
    }

    return acc;
  }, {} as Record<string, { totalEmployees: number; activeDevPlans: number; completedActions: number }>);

  // Convert to array and sort by active development plans
  const managerData = Object.entries(managerStats)
    .map(([department, stats]) => ({
      department,
      ...stats,
      engagementRate: Math.round((stats.activeDevPlans / stats.totalEmployees) * 100),
    }))
    .sort((a, b) => b.engagementRate - a.engagementRate);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          <CardTitle>Manager Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Team Size</TableHead>
              <TableHead className="text-right">Active Plans</TableHead>
              <TableHead className="text-right">Completed Actions</TableHead>
              <TableHead className="text-right">Engagement Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {managerData.map((manager) => (
              <TableRow key={manager.department}>
                <TableCell className="font-medium">{manager.department}</TableCell>
                <TableCell className="text-right">{manager.totalEmployees}</TableCell>
                <TableCell className="text-right">{manager.activeDevPlans}</TableCell>
                <TableCell className="text-right">{manager.completedActions}</TableCell>
                <TableCell className="text-right">{manager.engagementRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManagerActivityTracking;
