
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockEmployees } from "@/services/mockData";
import { Employee, SkillEnablers } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmployeeSkillForm from "@/components/talent/EmployeeSkillForm";
import EmployeeSkillTable from "@/components/talent/EmployeeSkillTable";

const SkillAssessment = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  // Filter employees based on search query
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSkillUpdate = (employeeId: string, skills: SkillEnablers) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, skillEnablers: skills };
      }
      return emp;
    });
    
    setEmployees(updatedEmployees);
    setSelectedEmployee(null);
    
    toast({
      title: "Skills updated",
      description: "Employee skill enablers have been successfully updated.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Skill Enablers Assessment</h1>
        </div>

        <p className="text-muted-foreground">
          Assess employees' skill enablers to complete their talent mapping. 
          Performance scores are imported via Excel, but skill enablers require manual assessment.
        </p>

        <div className="grid gap-6 md:grid-cols-12">
          {/* Employee list */}
          <Card className="md:col-span-7">
            <CardHeader className="pb-3">
              <CardTitle>Employees</CardTitle>
              <div className="relative w-full mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <EmployeeSkillTable 
                employees={filteredEmployees} 
                onSelectEmployee={setSelectedEmployee}
                selectedEmployeeId={selectedEmployee?.id}
              />
            </CardContent>
          </Card>

          {/* Skill assessment form */}
          <Card className="md:col-span-5">
            <CardHeader>
              <CardTitle>Skill Enablers Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEmployee ? (
                <EmployeeSkillForm 
                  employee={selectedEmployee} 
                  onSubmit={handleSkillUpdate}
                  onCancel={() => setSelectedEmployee(null)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <p>Select an employee from the list to assess their skill enablers</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => window.location.href = "/talent-map"}>
            View Talent Map
          </Button>
          <Button onClick={() => window.location.href = "/talent-constellation"}>
            View Talent Constellation
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SkillAssessment;
