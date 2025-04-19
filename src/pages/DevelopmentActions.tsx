
import MainLayout from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";
import { mockEmployees } from "@/services/mockData";
import { Employee } from "@/types/employee";
import DevelopmentActionsHeader from "@/components/development/DevelopmentActionsHeader";
import DevelopmentOverview from "@/components/development/DevelopmentOverview";
import ActiveDevelopmentPlans from "@/components/development/ActiveDevelopmentPlans";

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
        <DevelopmentOverview employees={employees} />
        <ActiveDevelopmentPlans employees={employees} />
      </div>
    </MainLayout>
  );
};

export default DevelopmentActions;
