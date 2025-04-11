
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ReportsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Analyze talent distribution and performance trends across the organization.
        </p>
      </div>
      <Button>
        <Download size={16} className="mr-2" />
        Export All
      </Button>
    </div>
  );
};

export default ReportsHeader;
