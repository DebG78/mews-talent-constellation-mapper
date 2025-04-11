
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
import { ChevronLeft, ChevronRight, HelpCircle, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import TalentMapControls from "@/components/talent/TalentMapControls";
import TalentMapFilters from "@/components/talent/TalentMapFilters";
import TalentMapVisualization from "@/components/talent/TalentMapVisualization";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const TalentMap = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
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

  const filteredEmployees = employees.filter(emp => {
    if (filter.department !== 'All' && emp.department !== filter.department) return false;
    if (filter.zone !== 'All' && emp.zonePosition.zone !== filter.zone) return false;
    if (filter.readiness !== 'All' && emp.readiness !== filter.readiness) return false;
    return true;
  });

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

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

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    // If panel is hidden and an employee is selected, show the panel
    if (!isPanelVisible) {
      setIsPanelVisible(true);
    }
  };

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Talent Map</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p className="text-sm">
                  The Talent Map visualizes employees across zones (Acceleration, Development, Support) 
                  and readiness levels (Ready Now, Ready Soon, Not Ready). These are separate but 
                  related concepts - an employee in the Acceleration zone might still be "Not Ready" 
                  for promotion if they need more experience.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePanel}
              className="hidden lg:flex items-center gap-1"
            >
              {isPanelVisible ? (
                <>
                  <ChevronRight size={16} />
                  <span>Hide Panel</span>
                </>
              ) : (
                <>
                  <ChevronLeft size={16} />
                  <span>Show Panel</span>
                </>
              )}
            </Button>
            <TalentMapControls 
              zoom={zoom} 
              setZoom={setZoom} 
              handleZoomIn={handleZoomIn} 
              handleZoomOut={handleZoomOut} 
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className={`col-span-12 ${isPanelVisible ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
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

          {isPanelVisible && (
            <div className="col-span-12 lg:col-span-4 space-y-4 transition-all duration-300">
              <Tabs defaultValue="filters" className="h-[800px]">
                <TabsList className="grid grid-cols-2 mb-4 w-full">
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="filters" className="mt-0 h-[calc(800px-48px)]">
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
                
                <TabsContent value="details" className="mt-0 h-[calc(800px-48px)] overflow-hidden">
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
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TalentMap;
