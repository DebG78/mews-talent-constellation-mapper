
import { useEffect, useState } from "react";
import { mockEmployees } from "@/services/mockData";
import { Employee } from "@/types/employee";
import EmployeeFilters from "@/components/talent/EmployeeFilters";
import EmployeeTable from "@/components/talent/EmployeeTable";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import EmployeeHeader from "@/components/talent/EmployeeHeader";
import OrganizationSnapshotButton from "@/components/talent/snapshots/OrganizationSnapshotButton";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedReadiness, setSelectedReadiness] = useState<string | null>(null);
  const [selectedJobGrade, setSelectedJobGrade] = useState<string | null>(null);

  useEffect(() => {
    setEmployees([...mockEmployees]);
  }, []);

  useEffect(() => {
    let filtered = [...employees];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.position.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query)
      );
    }

    if (selectedDepartment && selectedDepartment !== 'all') {
      filtered = filtered.filter((emp) => emp.department === selectedDepartment);
    }

    if (selectedZone && selectedZone !== 'all') {
      filtered = filtered.filter((emp) => emp.zonePosition.zone === selectedZone);
    }

    if (selectedReadiness && selectedReadiness !== 'all') {
      filtered = filtered.filter((emp) => emp.readiness === selectedReadiness);
    }

    if (selectedJobGrade && selectedJobGrade !== 'All') {
      filtered = filtered.filter((emp) => emp.jobGrade === selectedJobGrade);
    }

    setFilteredEmployees(filtered);

    if (selectedEmployee && !filtered.some((emp) => emp.id === selectedEmployee.id)) {
      setSelectedEmployee(null);
    }
  }, [employees, searchQuery, selectedDepartment, selectedZone, selectedReadiness, selectedJobGrade, selectedEmployee]);

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    
    setEmployees(updatedEmployees);
    setSelectedEmployee(updatedEmployee);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDepartment(null);
    setSelectedZone(null);
    setSelectedReadiness(null);
    setSelectedJobGrade(null);
  };

  const getZoneBadgeClass = (zone: string) => {
    switch (zone) {
      case 'Acceleration':
        return 'bg-acceleration/90 hover:bg-acceleration';
      case 'Growth':
        return 'bg-development/90 hover:bg-development';
      case 'Support':
        return 'bg-support/90 hover:bg-support';
      default:
        return 'bg-gray-500';
    }
  };

  const getReadinessBadgeClass = (readiness: string) => {
    switch (readiness) {
      case 'Ready Now':
        return 'border-ready-now text-ready-now';
      case 'Ready Soon':
        return 'border-ready-soon text-ready-soon';
      case 'Not Ready':
        return 'border-not-ready text-not-ready';
      default:
        return 'border-gray-500 text-gray-500';
    }
  };

  const handleOrgSnapshotCreated = () => {
    setEmployees([...mockEmployees]);
  };

  const departments = Array.from(new Set(employees.map((emp) => emp.department)));

  return (
    <div className="container py-6 space-y-6 max-w-screen-xl">
      <div className="flex items-center justify-between">
        <EmployeeHeader />
        <OrganizationSnapshotButton onSnapshotCreated={handleOrgSnapshotCreated} />
      </div>

      <EmployeeFilters
        departments={departments}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        selectedReadiness={selectedReadiness}
        onReadinessChange={setSelectedReadiness}
        selectedJobGrade={selectedJobGrade}
        onJobGradeChange={setSelectedJobGrade}
        onResetFilters={handleResetFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <EmployeeTable
            employees={filteredEmployees}
            selectedEmployee={selectedEmployee}
            onSelectEmployee={handleSelectEmployee}
            getZoneBadgeClass={getZoneBadgeClass}
            getReadinessBadgeClass={getReadinessBadgeClass}
          />
        </div>

        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <EmployeeDetailPanel 
              employee={selectedEmployee} 
              onUpdateEmployee={handleUpdateEmployee}
            />
          ) : (
            <div className="border rounded-md flex items-center justify-center h-full py-20 text-muted-foreground bg-muted/50">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">No Employee Selected</h3>
                <p>Select an employee from the table to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
