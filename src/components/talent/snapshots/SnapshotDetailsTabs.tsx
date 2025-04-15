
import React from "react";
import { Employee } from "@/types/employee";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GrowthJourneyMap from "./GrowthJourneyMap";
import SnapshotsList from "./SnapshotsList";

interface SnapshotDetailsTabsProps {
  employee: Employee;
}

const SnapshotDetailsTabs = ({ employee }: SnapshotDetailsTabsProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="journey">
        <TabsList className="mb-3 w-full">
          <TabsTrigger value="journey" className="flex-1">Growth Journey</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Snapshot History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="journey">
          <GrowthJourneyMap employee={employee} />
        </TabsContent>
        
        <TabsContent value="history">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-3">Snapshot History</h3>
            {employee.snapshots && employee.snapshots.length > 0 ? (
              <SnapshotsList 
                snapshots={employee.snapshots} 
                onSelectSnapshot={() => {}} 
              />
            ) : (
              <div className="text-center py-8 px-4 text-muted-foreground">
                <p>No snapshots available for this employee.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SnapshotDetailsTabs;
