
import React, { useState } from "react";
import { Employee, EmployeeSnapshot } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createSnapshot } from "@/services/snapshotService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryIcon, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SnapshotsList from "./SnapshotsList";
import SnapshotDetails from "./SnapshotDetails";
import SnapshotComparison from "./SnapshotComparison";

interface EmployeeSnapshotsPanelProps {
  employee: Employee;
  onEmployeeUpdate?: (updatedEmployee: Employee) => void;
}

const EmployeeSnapshotsPanel = ({ 
  employee,
  onEmployeeUpdate
}: EmployeeSnapshotsPanelProps) => {
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snapshotContext, setSnapshotContext] = useState("");
  const [selectedSnapshot, setSelectedSnapshot] = useState<EmployeeSnapshot | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "comparison">("details");
  
  const snapshots = employee.snapshots || [];
  
  const handleCreateSnapshot = () => {
    if (snapshotContext.trim() === "") {
      toast({
        title: "Missing context",
        description: "Please provide a context for this snapshot",
        variant: "destructive"
      });
      return;
    }
    
    const updatedEmployee = createSnapshot(employee.id, "Manual", snapshotContext);
    
    if (updatedEmployee) {
      toast({
        title: "Snapshot created",
        description: "Employee snapshot has been saved successfully"
      });
      
      if (onEmployeeUpdate) {
        onEmployeeUpdate(updatedEmployee);
      }
      
      setIsDialogOpen(false);
      setSnapshotContext("");
    } else {
      toast({
        title: "Error",
        description: "Failed to create snapshot",
        variant: "destructive"
      });
    }
  };
  
  const handleSelectSnapshot = (snapshot: EmployeeSnapshot) => {
    setSelectedSnapshot(snapshot);
    if (!selectedSnapshot) {
      setActiveTab("details");
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center" 
        onClick={() => setIsSheetOpen(true)}
      >
        <HistoryIcon size={16} className="mr-1" />
        Snapshots
      </Button>
      
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md md:max-w-lg">
          <SheetHeader className="mb-4">
            <SheetTitle>Employee Snapshots</SheetTitle>
            <SheetDescription>
              View historical snapshots of employee performance, skills, and placement
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex justify-between mb-4">
            <div className="text-sm">
              {snapshots.length} snapshot{snapshots.length !== 1 ? 's' : ''}
            </div>
            <Button 
              size="sm" 
              onClick={() => {
                setIsDialogOpen(true);
                setSnapshotContext("");
              }}
            >
              <Camera size={16} className="mr-1" />
              New Snapshot
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-120px)]">
            <div className="border rounded-md p-4 overflow-hidden">
              <h3 className="font-medium mb-3">Snapshots List</h3>
              <SnapshotsList 
                snapshots={snapshots} 
                onSelectSnapshot={handleSelectSnapshot}
                selectedSnapshotId={selectedSnapshot?.id}
              />
            </div>
            
            {selectedSnapshot ? (
              <div className="border rounded-md p-4 overflow-auto">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "details" | "comparison")}>
                  <TabsList className="mb-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="comparison">Compare with Current</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <SnapshotDetails snapshot={selectedSnapshot} />
                  </TabsContent>
                  
                  <TabsContent value="comparison">
                    <SnapshotComparison employee={employee} snapshot={selectedSnapshot} />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="border rounded-md p-4 flex items-center justify-center text-muted-foreground">
                <div className="text-center p-4">
                  <p>Select a snapshot to view details</p>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Snapshot</DialogTitle>
            <DialogDescription>
              Capture the current state of this employee's performance, skills, and placement
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Snapshot Context or Description
            </label>
            <Input
              placeholder="e.g., Q2 2025 Review, Manager Change, etc."
              value={snapshotContext}
              onChange={(e) => setSnapshotContext(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSnapshot}>
              Create Snapshot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeSnapshotsPanel;
