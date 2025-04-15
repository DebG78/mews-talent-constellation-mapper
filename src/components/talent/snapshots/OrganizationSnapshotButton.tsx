
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { createSnapshotsForAllEmployees } from "@/services/snapshotService";

interface OrganizationSnapshotButtonProps {
  onSnapshotCreated?: () => void;
}

const OrganizationSnapshotButton = ({ onSnapshotCreated }: OrganizationSnapshotButtonProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snapshotContext, setSnapshotContext] = useState("");
  
  const handleCreateOrgSnapshot = () => {
    if (snapshotContext.trim() === "") {
      toast({
        title: "Missing context",
        description: "Please provide a context for this organization-wide snapshot",
        variant: "destructive"
      });
      return;
    }
    
    createSnapshotsForAllEmployees("Regular Cycle", snapshotContext);
    
    toast({
      title: "Organization snapshot created",
      description: "Snapshots have been saved for all employees"
    });
    
    setIsDialogOpen(false);
    setSnapshotContext("");
    
    if (onSnapshotCreated) {
      onSnapshotCreated();
    }
  };
  
  return (
    <>
      <Button 
        variant="outline"
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center"
      >
        <Camera size={16} className="mr-1" />
        Create Organization Snapshot
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization-wide Snapshot</DialogTitle>
            <DialogDescription>
              This will create a snapshot for every employee in the organization, capturing their current performance, skills, and placement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">
              Snapshot Cycle Description
            </label>
            <Input
              placeholder="e.g., Q2 2025 Review Cycle, Annual Evaluation, etc."
              value={snapshotContext}
              onChange={(e) => setSnapshotContext(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrgSnapshot}>
              Create Organization Snapshot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrganizationSnapshotButton;
