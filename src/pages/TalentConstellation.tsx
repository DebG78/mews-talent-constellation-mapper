
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Employee, Readiness, Zone } from "@/types/employee";
import { mockEmployees } from "@/services/mockData";
import { User } from "lucide-react";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import ConstellationControls from "@/components/talent/ConstellationControls";
import ConstellationFilters from "@/components/talent/ConstellationFilters";
import ConstellationVisualization from "@/components/talent/ConstellationVisualization";

const TalentConstellation = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [filter, setFilter] = useState<{
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
  }>({
    department: 'All',
    zone: 'All',
    readiness: 'All',
  });
  
  // Filter employees based on current filter settings
  const filteredEmployees = employees.filter(emp => {
    if (filter.department !== 'All' && emp.department !== filter.department) return false;
    if (filter.zone !== 'All' && emp.zonePosition.zone !== filter.zone) return false;
    if (filter.readiness !== 'All' && emp.readiness !== filter.readiness) return false;
    return true;
  });

  // Reset all filters
  const resetFilters = () => {
    setFilter({
      department: 'All',
      zone: 'All',
      readiness: 'All',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Talent Constellation</h1>
          <ConstellationControls zoom={zoom} setZoom={setZoom} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main visualization area */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="overflow-hidden h-[800px]">
              <CardContent className="p-0 h-full relative">
                <ConstellationVisualization 
                  zoom={zoom}
                  filteredEmployees={filteredEmployees}
                  selectedEmployee={selectedEmployee}
                  setSelectedEmployee={setSelectedEmployee}
                  resetFilters={resetFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Control panel sidebar */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <Tabs defaultValue="filters">
              <TabsList className="grid grid-cols-2 mb-4 w-full">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="filters" className="mt-0">
                <ConstellationFilters 
                  employees={employees}
                  filter={filter}
                  setFilter={setFilter}
                  filteredEmployees={filteredEmployees}
                />
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedEmployee ? (
                  <EmployeeDetailPanel employee={selectedEmployee} />
                ) : (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <User size={64} className="mb-4 opacity-20" />
                      <p>Select an employee on the constellation to view their details</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TalentConstellation;
