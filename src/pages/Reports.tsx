
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockEmployees, getZoneDistribution, getReadinessDistribution, getDepartmentDistribution } from "@/services/mockData";
import ReportsHeader from "@/components/reports/ReportsHeader";
import ZoneDistributionChart from "@/components/reports/ZoneDistributionChart";
import ReadinessChart from "@/components/reports/ReadinessChart";
import DepartmentChart from "@/components/reports/DepartmentChart";
import DepartmentBreakdownChart from "@/components/reports/DepartmentBreakdownChart";
import PerformanceTrendChart from "@/components/reports/PerformanceTrendChart";
import KeyInsights from "@/components/reports/KeyInsights";
import TalentHealthSection from "@/components/reports/talent-health/TalentHealthSection";
import DevelopmentProgressChart from "@/components/reports/DevelopmentProgressChart";
import { Employee } from "@/types/employee";

const Reports = () => {
  // State to track the current employees data
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  // Load the latest employee data from localStorage if available
  useEffect(() => {
    try {
      const storedEmployees = localStorage.getItem('currentEmployees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    } catch (error) {
      console.error('Error loading employees data:', error);
      // Fallback to mock data
      setEmployees(mockEmployees);
    }
  }, []);

  // Generate zone distribution data for pie chart
  const zoneData = [
    { name: 'Acceleration', value: employees.filter(e => e.zonePosition.zone === 'Acceleration').length, color: '#0088CC' },
    { name: 'Growth', value: employees.filter(e => e.zonePosition.zone === 'Growth').length, color: '#FFA500' },
    { name: 'Support', value: employees.filter(e => e.zonePosition.zone === 'Support').length, color: '#CC0000' },
  ];

  // Get data for additional charts moved from Dashboard
  const zoneDistribution = getZoneDistribution();
  const readinessDistribution = getReadinessDistribution();
  const departmentDistribution = getDepartmentDistribution();

  // Generate department data by zone
  const departments = Array.from(new Set(employees.map(e => e.department)));

  // Format data for pie chart
  const zonePieData = [
    { name: "Acceleration Zone", value: zoneDistribution.acceleration, color: "#0088CC" },
    { name: "Growth Zone", value: zoneDistribution.growth, color: "#FFA500" },
    { name: "Support Zone", value: zoneDistribution.support, color: "#CC0000" },
  ];

  // Format data for readiness pie chart
  const readinessData = [
    { name: "Ready Now", value: readinessDistribution.readyNow, color: "#22c55e" },
    { name: "Ready Soon", value: readinessDistribution.readySoon, color: "#eab308" },
    { name: "Not Ready", value: readinessDistribution.notReady, color: "#6b7280" },
  ];

  // Format data for department bar chart
  const departmentBarData = Object.entries(departmentDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <ReportsHeader />

        {/* Distribution by Zone, Readiness, and Department */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ZoneDistributionChart 
            data={zonePieData} 
            title="Zone Distribution" 
            description="Employee distribution across talent zones" 
          />
          <ReadinessChart data={readinessData} />
          <DepartmentChart data={departmentBarData} />
        </div>

        {/* Development Progress Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <DevelopmentProgressChart employees={employees} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Department Breakdown Card */}
          <DepartmentBreakdownChart data={departments.map(dept => {
            const empInDept = employees.filter(e => e.department === dept);
            return {
              name: dept,
              Acceleration: empInDept.filter(e => e.zonePosition.zone === 'Acceleration').length,
              Growth: empInDept.filter(e => e.zonePosition.zone === 'Growth').length,
              Support: empInDept.filter(e => e.zonePosition.zone === 'Support').length,
            };
          })} />

          {/* Performance Trends Card */}
          <PerformanceTrendChart data={[
            { month: 'Jan', Acceleration: 3.8, Growth: 3.2, Support: 2.5 },
            { month: 'Feb', Acceleration: 3.9, Growth: 3.3, Support: 2.4 },
            { month: 'Mar', Acceleration: 4.0, Growth: 3.2, Support: 2.3 },
            { month: 'Apr', Acceleration: 4.1, Growth: 3.3, Support: 2.4 },
            { month: 'May', Acceleration: 4.2, Growth: 3.5, Support: 2.5 },
            { month: 'Jun', Acceleration: 4.3, Growth: 3.4, Support: 2.6 },
          ]} />
        </div>

        {/* Organizational Talent Health Section */}
        <TalentHealthSection />

        <div className="grid gap-6 md:grid-cols-1">
          {/* Key Insights Card */}
          <KeyInsights 
            zoneData={zoneData} 
            employees={employees} 
            departments={departments} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
