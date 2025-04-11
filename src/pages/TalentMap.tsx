
import { useState, useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import TalentMapControls from "@/components/talent/TalentMapControls";
import TalentMapFilters from "@/components/talent/TalentMapFilters";
import TalentMapVisualization from "@/components/talent/TalentMapVisualization";

const TalentMap = () => {
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
  
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Filter employees based on current filter settings
  const filteredEmployees = employees.filter(emp => {
    if (filter.department !== 'All' && emp.department !== filter.department) return false;
    if (filter.zone !== 'All' && emp.zonePosition.zone !== filter.zone) return false;
    if (filter.readiness !== 'All' && emp.readiness !== filter.readiness) return false;
    return true;
  });

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilter({
      department: 'All',
      zone: 'All',
      readiness: 'All',
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  // Handle employee selection
  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Talent Map</h1>
          <TalentMapControls 
            zoom={zoom} 
            setZoom={setZoom} 
            handleZoomIn={handleZoomIn} 
            handleZoomOut={handleZoomOut} 
          />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main visualization area */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="overflow-hidden h-[800px]">
              <CardContent className="p-0 h-full relative">
                <TalentMapVisualization 
                  mapRef={mapRef}
                  zoom={zoom}
                  filteredEmployees={filteredEmployees}
                  selectedEmployee={selectedEmployee}
                  handleEmployeeClick={handleEmployeeClick}
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
                <TalentMapFilters 
                  employees={employees}
                  filter={filter}
                  setFilter={setFilter}
                  filteredEmployees={filteredEmployees}
                  resetFilters={resetFilters}
                />
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Showing {filteredEmployees.length} of {employees.length} employees</p>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedEmployee ? (
                  <EmployeeDetailPanel employee={selectedEmployee} />
                ) : (
                  <Card>
                    <CardContent className="pt-6 flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <User size={64} className="mb-4 opacity-20" />
                      <p>Select an employee on the map to view their details</p>
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

export default TalentMap;
