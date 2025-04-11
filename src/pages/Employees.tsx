
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockEmployees } from "@/services/mockData";
import { Employee } from "@/types/employee";
import { Search, ChevronDown, Download, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Employees = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter employees based on search query
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get badge color based on zone
  const getZoneBadgeClass = (zone: string) => {
    switch (zone) {
      case 'Acceleration':
        return 'bg-acceleration text-white hover:bg-acceleration/80';
      case 'Development':
        return 'bg-development text-white hover:bg-development/80';
      case 'Support':
        return 'bg-support text-white hover:bg-support/80';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Get badge color based on readiness
  const getReadinessBadgeClass = (readiness: string) => {
    switch (readiness) {
      case 'Ready Now':
        return 'bg-ready-now text-white hover:bg-ready-now/80';
      case 'Ready Soon':
        return 'bg-ready-soon text-white hover:bg-ready-soon/80';
      case 'Not Ready':
        return 'bg-not-ready text-white hover:bg-not-ready/80';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button>
              <UserPlus size={16} className="mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Employees</DropdownMenuItem>
              <DropdownMenuItem>Acceleration Zone</DropdownMenuItem>
              <DropdownMenuItem>Development Zone</DropdownMenuItem>
              <DropdownMenuItem>Support Zone</DropdownMenuItem>
              <DropdownMenuItem>Ready Now</DropdownMenuItem>
              <DropdownMenuItem>Ready Soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border rounded-md">
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
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
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
              ))}
            </TableBody>
          </Table>
          {filteredEmployees.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No employees found matching your search criteria.
            </div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;
