
import MainLayout from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";
import { mockEmployees } from "@/services/mockData";
import { Employee } from "@/types/employee";
import DevelopmentActionsHeader from "@/components/development/DevelopmentActionsHeader";
import DevelopmentOverview from "@/components/development/DevelopmentOverview";
import ActiveDevelopmentPlans from "@/components/development/ActiveDevelopmentPlans";
import DevelopmentCalendar from "@/components/development/DevelopmentCalendar";
import DepartmentCompletion from "@/components/development/DepartmentCompletion";
import SkillsBreakdown from "@/components/development/SkillsBreakdown";

const DevelopmentActions = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  useEffect(() => {
    try {
      const storedEmployees = localStorage.getItem('currentEmployees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    } catch (error) {
      console.error('Error loading employees data:', error);
      setEmployees(mockEmployees);
    }
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <DevelopmentActionsHeader />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DevelopmentOverview employees={employees} />
          <DevelopmentCalendar employees={employees} />
          <SkillsBreakdown employees={employees} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DepartmentCompletion employees={employees} />
        </div>

        <ActiveDevelopmentPlans employees={employees} />
      </div>
    </MainLayout>
  );
};

export default DevelopmentActions;
