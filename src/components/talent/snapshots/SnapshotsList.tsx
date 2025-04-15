
import React from "react";
import { EmployeeSnapshot } from "@/types/employee";
import { CalendarIcon, Clock, InfoIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface SnapshotsListProps {
  snapshots: EmployeeSnapshot[];
  onSelectSnapshot: (snapshot: EmployeeSnapshot) => void;
  selectedSnapshotId?: string;
}

const SnapshotsList = ({ 
  snapshots, 
  onSelectSnapshot,
  selectedSnapshotId
}: SnapshotsListProps) => {
  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="text-center py-8 px-4 text-muted-foreground">
        <p>No snapshots available for this employee.</p>
      </div>
    );
  }

  // Sort snapshots by date (newest first)
  const sortedSnapshots = [...snapshots].sort((a, b) => 
    new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  return (
    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
      {sortedSnapshots.map((snapshot) => {
        // Format the date
        const dateCreated = new Date(snapshot.dateCreated);
        const formattedDate = dateCreated.toLocaleDateString();
        const timeAgo = formatDistanceToNow(dateCreated, { addSuffix: true });
        
        return (
          <Card 
            key={snapshot.id} 
            className={cn(
              "cursor-pointer hover:bg-muted/50 transition-colors",
              selectedSnapshotId === snapshot.id && "border-primary bg-muted/50"
            )}
            onClick={() => onSelectSnapshot(snapshot)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{snapshot.context}</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <CalendarIcon size={12} className="mr-1" />
                    {formattedDate}
                    <span className="mx-1">•</span>
                    <Clock size={12} className="mr-1" />
                    {timeAgo}
                  </div>
                </div>
                <Badge 
                  variant={snapshot.snapshotType === 'Regular Cycle' ? "default" : "outline"}
                  className="text-xs"
                >
                  {snapshot.snapshotType}
                </Badge>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Rating: {snapshot.performanceRating}/5
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Zone: {snapshot.zonePosition.zone}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {snapshot.readiness}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SnapshotsList;
