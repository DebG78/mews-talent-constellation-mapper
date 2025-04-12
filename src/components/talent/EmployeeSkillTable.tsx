
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmployeeSkillTableProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  selectedEmployeeId?: string;
}

const EmployeeSkillTable = ({ employees, onSelectEmployee, selectedEmployeeId }: EmployeeSkillTableProps) => {
  // Helper function to check if all skill enablers have been assessed
  const isFullyAssessed = (employee: Employee): boolean => {
    const { drive, learningAgility, innovation, adaptability } = employee.skillEnablers;
    return drive > 0 && learningAgility > 0 && innovation > 0 && adaptability > 0;
  };

  // Calculate the average skill enabler score
  const getAverageSkillScore = (employee: Employee): number => {
    const { drive, learningAgility, innovation, adaptability } = employee.skillEnablers;
    return (drive + learningAgility + innovation + adaptability) / 4;
  };

  // Function to get the rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 5) return "Sets a New Standard";
    if (rating >= 4) return "Often Exceeds Expectations";
    if (rating >= 3) return "Consistently Meets Expectations";
    return "Needs Development";
  };

  // Function to get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 5) return "bg-purple-600";
    if (rating >= 4) return "bg-blue-600";
    if (rating >= 3) return "bg-green-600";
    return "bg-amber-600";
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Skills Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No employees found matching your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow 
                key={employee.id}
                className={cn(
                  selectedEmployeeId === employee.id && "bg-muted/50",
                  "cursor-pointer hover:bg-muted/30"
                )}
                onClick={() => onSelectEmployee(employee)}
              >
                <TableCell className="font-medium">
                  <div>
                    {employee.name}
                    <div className="text-sm text-muted-foreground">{employee.position}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center cursor-help">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full mr-2">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                getRatingColor(employee.performanceRating)
                              )}
                              style={{ width: `${employee.performanceRating * 20}%` }}
                            />
                          </div>
                          <span className="text-sm">{employee.performanceRating}/5</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs p-2">
                        <p className="text-sm font-medium">{getRatingLabel(employee.performanceRating)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {isFullyAssessed(employee) ? (
                      <>
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                        <span>Assessed ({getAverageSkillScore(employee).toFixed(1)}/5)</span>
                      </>
                    ) : (
                      <>
                        <Circle size={16} className="text-amber-500 mr-2" />
                        <span>Needs assessment</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEmployee(employee);
                    }}
                  >
                    {isFullyAssessed(employee) ? "Edit" : "Assess"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeSkillTable;
