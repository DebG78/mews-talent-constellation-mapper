
import { Sparkles, User, Wrench } from "lucide-react";
import { Employee } from "@/types/employee";

interface EmployeeNodeProps {
  employee: Employee;
  position: { x: number; y: number };
  selected: boolean;
  onClick: () => void;
}

const ConstellationEmployeeNode = ({ 
  employee, 
  position, 
  selected, 
  onClick 
}: EmployeeNodeProps) => {
  // Determine employee icon based on readiness
  const getEmployeeIcon = () => {
    switch (employee.readiness) {
      case 'Ready Now':
        return <Sparkles size={20} className="text-yellow-300" />;
      case 'Ready Soon':
        return <Wrench size={20} className="text-orange-500" />;
      default:
        return <User size={20} className="text-white" />;
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 animate-float hover:z-10`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        animation: `float ${3 + Math.random() * 3}s ease-in-out infinite, pulse-soft ${2 + Math.random() * 3}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      <div 
        className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow`}
        style={{ 
          backgroundColor: employee.zonePosition.zone === 'Acceleration' 
            ? '#FFDA44' 
            : employee.zonePosition.zone === 'Development' 
              ? '#9B5DE5' 
              : '#F94144',
          border: selected ? '2px solid white' : '2px solid transparent',
        }}
      >
        {getEmployeeIcon()}
      </div>
      {selected && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/10 backdrop-blur-md p-2 rounded shadow-lg z-10 whitespace-nowrap text-white">
          <p className="font-semibold">{employee.name}</p>
          <p className="text-xs text-gray-300">{employee.position}</p>
        </div>
      )}
    </div>
  );
};

export default ConstellationEmployeeNode;
