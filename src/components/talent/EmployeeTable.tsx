
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/types/employee";
import { cn } from "@/lib/utils";

interface EmployeeTableProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
  getZoneBadgeClass: (zone: string) => string;
  getReadinessBadgeClass: (readiness: string) => string;
}

const EmployeeTable = ({ 
  employees, 
  selectedEmployee, 
  onSelectEmployee,
  getZoneBadgeClass,
  getReadinessBadgeClass
}: EmployeeTableProps) => {
  return (
    <div className="border rounded-md flex-1 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Zone</TableHead>
            <TableHead>Readiness</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No employees found matching your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow 
                key={employee.id} 
                className={cn(
                  "cursor-pointer hover:bg-muted/50",
                  selectedEmployee?.id === employee.id && "bg-muted"
                )}
                onClick={() => onSelectEmployee(employee)}
              >
                <TableCell className="font-medium">
                  <div>
                    {employee.name}
                    <div className="text-sm text-muted-foreground">{employee.position}</div>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Badge className={cn(getZoneBadgeClass(employee.zonePosition.zone))}>
                    {employee.zonePosition.zone}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(getReadinessBadgeClass(employee.readiness))}>
                    {employee.readiness}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full mr-2">
                      <div 
                        className={`h-full rounded-full ${
                          employee.performanceRating >= 4 ? "bg-green-500" : 
                          employee.performanceRating >= 3 ? "bg-blue-500" : 
                          employee.performanceRating >= 2 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${employee.performanceRating * 20}%` }}
                      />
                    </div>
                    <span className="text-sm">{employee.performanceRating}/5</span>
                  </div>
                </TableCell>
                <TableCell>{employee.joinDate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
