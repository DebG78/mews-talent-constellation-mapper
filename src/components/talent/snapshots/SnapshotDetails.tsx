
import React from "react";
import { EmployeeSnapshot } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClipboardCheck } from "lucide-react";
import SkillEnablerBar from "../SkillEnablerBar";

interface SnapshotDetailsProps {
  snapshot: EmployeeSnapshot;
}

const SnapshotDetails = ({ snapshot }: SnapshotDetailsProps) => {
  const dateCreated = new Date(snapshot.dateCreated);
  const formattedDate = dateCreated.toLocaleDateString();
  const formattedTime = dateCreated.toLocaleTimeString();

  // Helper function to get zone color
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'Acceleration':
        return 'bg-acceleration text-white';
      case 'Growth':
        return 'bg-development text-white';
      case 'Support':
        return 'bg-support text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Helper function to get readiness color
  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'Ready Now':
        return 'bg-ready-now text-white';
      case 'Ready Soon':
        return 'bg-ready-soon text-white';
      case 'Not Ready':
        return 'bg-not-ready text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{snapshot.context}</CardTitle>
          <Badge 
            variant={snapshot.snapshotType === 'Regular Cycle' ? "default" : "outline"}
          >
            {snapshot.snapshotType}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground flex items-center">
          <CalendarIcon size={12} className="mr-1" />
          {formattedDate} at {formattedTime}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Position</p>
            <p className="text-sm">{snapshot.position}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Job Grade</p>
            <p className="text-sm">{snapshot.jobGrade || 'Not specified'}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Zone</p>
            <Badge className={getZoneColor(snapshot.zonePosition.zone)}>
              {snapshot.zonePosition.zone}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">Readiness</p>
            <Badge className={getReadinessColor(snapshot.readiness)}>
              {snapshot.readiness}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center">
            <ClipboardCheck size={14} className="mr-1" />
            Performance Rating
          </p>
          <div className="h-2 bg-gray-100 rounded-full">
            <div 
              className={`h-full rounded-full ${
                snapshot.performanceRating >= 4 ? "bg-blue-600" : 
                snapshot.performanceRating >= 3 ? "bg-green-600" : 
                "bg-amber-600"
              }`}
              style={{ width: `${snapshot.performanceRating * 20}%` }}
            />
          </div>
          <div className="text-sm text-right">{snapshot.performanceRating}/5</div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Skill Enablers</p>
          <div className="space-y-2">
            <SkillEnablerBar 
              label="Drive" 
              value={snapshot.skillEnablers.drive} 
              color="bg-blue-500" 
            />
            <SkillEnablerBar 
              label="Learning Agility" 
              value={snapshot.skillEnablers.learningAgility} 
              color="bg-green-500" 
            />
            <SkillEnablerBar 
              label="Innovation" 
              value={snapshot.skillEnablers.innovation} 
              color="bg-purple-500" 
            />
            <SkillEnablerBar 
              label="Adaptability" 
              value={snapshot.skillEnablers.adaptability} 
              color="bg-orange-500" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnapshotDetails;
