
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import TalentMapLegend from "./TalentMapLegend";
import { Employee } from "@/types/employee";
import { AlertCircle } from "lucide-react";

interface TalentMapVisualizationProps {
  mapRef: React.RefObject<HTMLDivElement>;
  zoom: number;
  filteredEmployees: Employee[];
  selectedEmployee: Employee | null;
  handleEmployeeClick: (employee: Employee) => void;
  resetFilters: () => void;
}

const TalentMapVisualization = ({
  mapRef,
  zoom,
  filteredEmployees,
  selectedEmployee,
  handleEmployeeClick,
  resetFilters
}: TalentMapVisualizationProps) => {
  return (
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
      <div className="absolute top-8 right-8 text-xl font-semibold text-acceleration">Acceleration Zone</div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-development">Growth Zone</div>
      <div className="absolute bottom-8 left-8 text-xl font-semibold text-support">Support Zone</div>
      
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
              className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-md hover:shadow-lg transition-shadow`}
              style={{ 
                backgroundColor: employee.zonePosition.zone === 'Acceleration' 
                  ? '#0088CC' 
                  : employee.zonePosition.zone === 'Growth' 
                    ? '#FFA500' 
                    : '#CC0000',
                border: selectedEmployee?.id === employee.id ? '3px solid white' : '2px solid transparent',
              }}
            >
              <User size={20} className="text-white" />
              <div 
                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border border-white`}
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
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-3 rounded shadow-lg z-10 whitespace-nowrap max-w-xs">
                <p className="font-semibold text-sm truncate">{employee.name}</p>
                <p className="text-xs text-gray-600 truncate">{employee.position}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10">
        <TalentMapLegend />
      </div>
      
      {/* Empty state message when no employees match filters */}
      {filteredEmployees.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AlertCircle size={64} className="text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-600">No employees match your filters</h2>
          <p className="text-gray-500 mt-2 text-lg">Try adjusting your filters or</p>
          <Button onClick={resetFilters} variant="link" className="mt-2 text-lg">Reset all filters</Button>
        </div>
      )}
    </div>
  );
};

export default TalentMapVisualization;
