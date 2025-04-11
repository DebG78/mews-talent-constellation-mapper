
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee, Readiness, Zone } from "@/types/employee";
import { mockEmployees } from "@/services/mockData";
import { 
  ZoomIn, 
  ZoomOut, 
  Filter, 
  RefreshCw, 
  User, 
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmployeeDetailPanel from "@/components/talent/EmployeeDetailPanel";
import TalentMapLegend from "@/components/talent/TalentMapLegend";

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

  // Get unique departments for filter dropdown
  const departments = ['All', ...Array.from(new Set(employees.map(emp => emp.department)))];

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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut size={16} />
            </Button>
            <Slider 
              value={[zoom]} 
              min={0.5} 
              max={2} 
              step={0.1} 
              onValueChange={(value) => setZoom(value[0])}
              className="w-24" 
            />
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main visualization area */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="overflow-hidden h-[800px]">
              <CardContent className="p-0 h-full relative">
                <div 
                  ref={mapRef}
                  className="absolute inset-0 bg-slate-50 overflow-hidden transition-transform"
                  style={{ 
                    backgroundImage: `radial-gradient(circle at center, rgba(0, 136, 204, 0.05) 0%, rgba(0, 0, 0, 0) 70%)`,
                    backgroundSize: '100% 100%',
                  }}
                >
                  {/* Zone backgrounds */}
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 rounded-bl-full opacity-10 bg-acceleration"></div>
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-10 bg-development"></div>
                  <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-tr-full opacity-10 bg-support"></div>
                  
                  {/* Zone labels */}
                  <div className="absolute top-6 right-6 text-lg font-semibold text-acceleration">Acceleration Zone</div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-development">Development Zone</div>
                  <div className="absolute bottom-6 left-6 text-lg font-semibold text-support">Support Zone</div>
                  
                  {/* Employees visualization */}
                  <div className="relative w-full h-full" style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.3s ease-out' }}>
                    {filteredEmployees.map((employee) => (
                      <div
                        key={employee.id}
                        className={`absolute cursor-pointer transition-all duration-300 animate-float hover:z-10`}
                        style={{
                          left: `${employee.zonePosition.x}%`,
                          top: `${employee.zonePosition.y}%`,
                          animation: `float ${3 + Math.random() * 3}s ease-in-out infinite, pulse-soft ${2 + Math.random() * 3}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <div 
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow`}
                          style={{ 
                            backgroundColor: employee.zonePosition.zone === 'Acceleration' 
                              ? '#0088CC' 
                              : employee.zonePosition.zone === 'Development' 
                                ? '#FFA500' 
                                : '#CC0000',
                            border: selectedEmployee?.id === employee.id ? '2px solid white' : '2px solid transparent',
                          }}
                        >
                          <User size={16} className="text-white" />
                          <div 
                            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white`}
                            style={{
                              backgroundColor: employee.readiness === 'Ready Now' 
                                ? '#22c55e' 
                                : employee.readiness === 'Ready Soon' 
                                  ? '#eab308' 
                                  : '#6b7280'
                            }}
                          />
                        </div>
                        {selectedEmployee?.id === employee.id && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded shadow-lg z-10 whitespace-nowrap">
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-xs text-gray-600">{employee.position}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute top-4 left-4 z-10">
                  <TalentMapLegend />
                </div>
                
                {/* Empty state message when no employees match filters */}
                {filteredEmployees.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <AlertCircle size={48} className="text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600">No employees match your filters</h2>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or</p>
                    <Button onClick={resetFilters} variant="link" className="mt-2">Reset all filters</Button>
                  </div>
                )}
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
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Select 
                        value={filter.department} 
                        onValueChange={(value) => setFilter({...filter, department: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Zone</label>
                      <Select 
                        value={filter.zone} 
                        onValueChange={(value) => setFilter({...filter, zone: value as Zone | 'All'})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Zones</SelectItem>
                          <SelectItem value="Acceleration">Acceleration Zone</SelectItem>
                          <SelectItem value="Development">Development Zone</SelectItem>
                          <SelectItem value="Support">Support Zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Readiness</label>
                      <Select 
                        value={filter.readiness} 
                        onValueChange={(value) => setFilter({...filter, readiness: value as Readiness | 'All'})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select readiness" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Ready Now">Ready Now</SelectItem>
                          <SelectItem value="Ready Soon">Ready Soon</SelectItem>
                          <SelectItem value="Not Ready">Not Ready</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button onClick={resetFilters} variant="outline" className="w-full">
                        <RefreshCw size={16} className="mr-2" />
                        Reset
                      </Button>
                      <Button className="w-full">
                        <Filter size={16} className="mr-2" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
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
