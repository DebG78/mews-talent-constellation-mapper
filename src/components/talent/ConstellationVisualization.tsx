
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import ConstellationLegend from "./ConstellationLegend";
import ConstellationEmployeeNode from "./ConstellationEmployeeNode";
import { AlertCircle } from "lucide-react";
import { Employee } from "@/types/employee";

interface ConstellationVisualizationProps {
  zoom: number;
  filteredEmployees: Employee[];
  selectedEmployee: Employee | null;
  setSelectedEmployee: (employee: Employee | null) => void;
  resetFilters: () => void;
}

const ConstellationVisualization = ({
  zoom,
  filteredEmployees,
  selectedEmployee,
  setSelectedEmployee,
  resetFilters
}: ConstellationVisualizationProps) => {
  const constellationRef = useRef<HTMLDivElement>(null);

  // Calculate position in constellation based on zone
  const getEmployeePosition = (employee: Employee) => {
    const zone = employee.zonePosition.zone;
    let radius = 0;
    let angle = 0;
    
    switch (zone) {
      case 'Acceleration':
        radius = 50; // Small inner circle
        break;
      case 'Development':
        radius = 150; // Middle circle
        break;
      case 'Support':
        radius = 250; // Outer circle
        break;
    }
    
    // Add some randomness to distribute points around the circle
    angle = Math.random() * 2 * Math.PI;
    
    // Add minor random variation to radius to avoid perfect circles
    const radiusVariation = radius * 0.15 * Math.random();
    radius = radius + radiusVariation;
    
    const x = 400 + radius * Math.cos(angle);
    const y = 400 + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div 
      ref={constellationRef}
      className="absolute inset-0 bg-slate-900 overflow-hidden transition-transform"
    >
      {/* Create constellation background with stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={`star-${i}`}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      ))}
      
      {/* Zone circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[800px] h-[800px]" style={{ transform: `scale(${zoom})` }}>
          {/* Center point */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          
          {/* Acceleration Zone - Inner circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-gray-400 opacity-30" />
          <div className="absolute top-[380px] left-[400px] text-yellow-300 font-semibold">Acceleration Zone</div>
          
          {/* Development Zone - Middle circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-gray-400 opacity-30" />
          <div className="absolute top-[320px] left-[400px] text-purple-400 font-semibold">Development Zone</div>
          
          {/* Support Zone - Outer circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gray-400 opacity-30" />
          <div className="absolute top-[280px] left-[400px] text-red-400 font-semibold">Support Zone</div>

          {/* Employees visualization */}
          {filteredEmployees.map((employee) => {
            const position = getEmployeePosition(employee);
            return (
              <ConstellationEmployeeNode
                key={employee.id}
                employee={employee}
                position={position}
                selected={selectedEmployee?.id === employee.id}
                onClick={() => setSelectedEmployee(employee)}
              />
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10">
        <ConstellationLegend />
      </div>
      
      {/* Empty state message when no employees match filters */}
      {filteredEmployees.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <AlertCircle size={48} className="text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-300">No employees match your filters</h2>
          <p className="text-gray-400 mt-2">Try adjusting your filters or</p>
          <Button onClick={resetFilters} variant="link" className="mt-2 text-gray-300">Reset all filters</Button>
        </div>
      )}
    </div>
  );
};

export default ConstellationVisualization;
