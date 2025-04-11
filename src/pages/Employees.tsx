
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockEmployees } from "@/services/mockData";
import { Employee } from "@/types/employee";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import EmployeeHeader from "@/components/talent/EmployeeHeader";
import EmployeeFilters from "@/components/talent/EmployeeFilters";
import EmployeeTable from "@/components/talent/EmployeeTable";
import { getZoneBadgeClass, getReadinessBadgeClass } from "@/utils/badgeUtils";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  // Filter employees based on search query
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update employee in the list when development options change
  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    setSelectedEmployee(updatedEmployee);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] space-y-6 animate-fade-in">
        <EmployeeHeader />
        <EmployeeFilters 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <div className="flex gap-6 h-full overflow-hidden">
          <EmployeeTable 
            employees={filteredEmployees}
            selectedEmployee={selectedEmployee}
            onSelectEmployee={setSelectedEmployee}
            getZoneBadgeClass={getZoneBadgeClass}
            getReadinessBadgeClass={getReadinessBadgeClass}
          />
          
          {selectedEmployee && (
            <div className="w-1/3 min-w-80 max-w-md">
              <EmployeeDetailPanel 
                employee={selectedEmployee} 
                onUpdateEmployee={handleUpdateEmployee}
              />
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
