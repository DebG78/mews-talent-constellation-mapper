
import React from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee, EmployeeSnapshot, SkillEnablers } from "@/types/employee";
import SkillEnablerBar from "../SkillEnablerBar";
import { formatDistanceToNow } from "date-fns";

interface SnapshotComparisonProps {
  employee: Employee;
  snapshot: EmployeeSnapshot;
}

const SnapshotComparison = ({ 
  employee, 
  snapshot 
}: SnapshotComparisonProps) => {
  const snapshotDate = new Date(snapshot.dateCreated);
  const timeAgo = formatDistanceToNow(snapshotDate, { addSuffix: true });
  
  // Compare performance ratings
  const performanceDiff = employee.performanceRating - snapshot.performanceRating;
  
  // Compare skill enablers
  const compareSkillEnablers = (current: SkillEnablers, snapshot: SkillEnablers) => {
    return {
      drive: current.drive - snapshot.drive,
      learningAgility: current.learningAgility - snapshot.learningAgility,
      innovation: current.innovation - snapshot.innovation,
      adaptability: current.adaptability - snapshot.adaptability
    };
  };
  
  const skillDifferences = compareSkillEnablers(employee.skillEnablers, snapshot.skillEnablers);
  
  // Calculate average skill change
  const avgSkillChange = Object.values(skillDifferences).reduce((sum, value) => sum + value, 0) / 4;
  
  // Helper function to render change indicator
  const renderChangeIndicator = (change: number) => {
    if (change === 0) return <Minus size={14} className="text-gray-400" />;
    if (change > 0) return <ArrowUp size={14} className="text-green-500" />;
    return <ArrowDown size={14} className="text-red-500" />;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-baseline justify-between">
          <span>Comparison with {snapshot.context}</span>
          <span className="text-xs font-normal text-muted-foreground">{timeAgo}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Change */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Performance Rating</p>
            <div className="flex items-center space-x-1">
              {renderChangeIndicator(performanceDiff)}
              <span className={`text-sm ${performanceDiff > 0 ? 'text-green-600' : performanceDiff < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                {Math.abs(performanceDiff).toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 space-y-1">
              <div className="text-xs">Then: {snapshot.performanceRating}/5</div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div 
                  className="h-full rounded-full bg-gray-400"
                  style={{ width: `${snapshot.performanceRating * 20}%` }}
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="text-xs">Now: {employee.performanceRating}/5</div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div 
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${employee.performanceRating * 20}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Zone Change */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Talent Zone</p>
          <div className="flex space-x-2 items-center">
            <div className="px-2 py-1 bg-gray-100 rounded text-xs">
              Then: {snapshot.zonePosition.zone}
            </div>
            {snapshot.zonePosition.zone !== employee.zonePosition.zone && (
              <ArrowRight className="text-gray-400" size={14} />
            )}
            {snapshot.zonePosition.zone !== employee.zonePosition.zone && (
              <div className="px-2 py-1 bg-blue-50 rounded text-xs">
                Now: {employee.zonePosition.zone}
              </div>
            )}
            {snapshot.zonePosition.zone === employee.zonePosition.zone && (
              <div className="text-xs text-gray-500">No change</div>
            )}
          </div>
        </div>
        
        {/* Readiness Change */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Readiness</p>
          <div className="flex space-x-2 items-center">
            <div className="px-2 py-1 bg-gray-100 rounded text-xs">
              Then: {snapshot.readiness}
            </div>
            {snapshot.readiness !== employee.readiness && (
              <ArrowRight className="text-gray-400" size={14} />
            )}
            {snapshot.readiness !== employee.readiness && (
              <div className="px-2 py-1 bg-blue-50 rounded text-xs">
                Now: {employee.readiness}
              </div>
            )}
            {snapshot.readiness === employee.readiness && (
              <div className="text-xs text-gray-500">No change</div>
            )}
          </div>
        </div>
        
        {/* Skill Changes */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-sm font-medium">Skill Enablers</p>
            <div className="flex items-center space-x-1">
              {renderChangeIndicator(avgSkillChange)}
              <span className={`text-sm ${avgSkillChange > 0 ? 'text-green-600' : avgSkillChange < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                Avg: {Math.abs(avgSkillChange).toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-medium">Then</div>
              <SkillEnablerBar 
                label="Drive" 
                value={snapshot.skillEnablers.drive} 
                color="bg-gray-400" 
              />
              <SkillEnablerBar 
                label="Learning Agility" 
                value={snapshot.skillEnablers.learningAgility} 
                color="bg-gray-400" 
              />
              <SkillEnablerBar 
                label="Innovation" 
                value={snapshot.skillEnablers.innovation} 
                color="bg-gray-400" 
              />
              <SkillEnablerBar 
                label="Adaptability" 
                value={snapshot.skillEnablers.adaptability} 
                color="bg-gray-400" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-xs font-medium">Now</div>
              <div className="flex items-center">
                <div className="flex-1">
                  <SkillEnablerBar 
                    label="Drive" 
                    value={employee.skillEnablers.drive} 
                    color="bg-blue-500" 
                  />
                </div>
                <div className="w-6 flex justify-center">
                  {renderChangeIndicator(skillDifferences.drive)}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <SkillEnablerBar 
                    label="Learning Agility" 
                    value={employee.skillEnablers.learningAgility} 
                    color="bg-green-500" 
                  />
                </div>
                <div className="w-6 flex justify-center">
                  {renderChangeIndicator(skillDifferences.learningAgility)}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <SkillEnablerBar 
                    label="Innovation" 
                    value={employee.skillEnablers.innovation} 
                    color="bg-purple-500" 
                  />
                </div>
                <div className="w-6 flex justify-center">
                  {renderChangeIndicator(skillDifferences.innovation)}
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <SkillEnablerBar 
                    label="Adaptability" 
                    value={employee.skillEnablers.adaptability} 
                    color="bg-orange-500" 
                  />
                </div>
                <div className="w-6 flex justify-center">
                  {renderChangeIndicator(skillDifferences.adaptability)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add missing ArrowRight icon
const ArrowRight = ({ className, size }: { className?: string, size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default SnapshotComparison;
