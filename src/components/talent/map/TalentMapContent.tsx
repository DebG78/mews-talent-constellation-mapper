
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import TalentMapVisualization from "../TalentMapVisualization";
import EmployeeDetailPanel from "../EmployeeDetailPanel";
import TalentMapFilters from "../TalentMapFilters";
import { useTalentMap } from "@/contexts/TalentMapContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";

const TalentMapContent = () => {
  const {
    zoom,
    isPanelVisible,
    activeTab,
    setActiveTab,
    filteredEmployees,
    selectedEmployee,
    handleEmployeeClick,
    resetFilters,
    togglePanel,
    filter,
    setFilter,
    employees,
    handleUpdateEmployee
  } = useTalentMap();
  
  const isMobile = useIsMobile();
  const mapRef = useRef<HTMLDivElement>(null);
  
  const mapHeight = isMobile ? "600px" : "calc(100vh - 180px)";

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className={`col-span-12 ${isPanelVisible ? 'lg:col-span-8' : 'lg:col-span-12'} transition-all duration-300`}>
        <Card className="overflow-hidden" style={{ height: mapHeight }}>
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
          <Tabs value={activeTab} onValueChange={setActiveTab} style={{ height: mapHeight }}>
            <TabsList className="grid grid-cols-2 mb-4 w-full">
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="filters" className="mt-0" style={{ height: `calc(${mapHeight} - 48px)` }}>
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
            
            <TabsContent value="details" className="mt-0 overflow-hidden" style={{ height: `calc(${mapHeight} - 48px)` }}>
              {selectedEmployee ? (
                <EmployeeDetailPanel 
                  employee={selectedEmployee} 
                  onUpdateEmployee={handleUpdateEmployee} 
                />
              ) : (
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <User size={80} className="mb-6 opacity-20" />
                    <p className="text-lg">Select an employee on the map to view their details</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default TalentMapContent;
