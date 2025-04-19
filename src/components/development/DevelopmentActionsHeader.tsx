
import { Card, CardContent } from "@/components/ui/card";

const DevelopmentActionsHeader = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Development Actions</h1>
      <p className="text-muted-foreground">
        Track and manage development plans across the organization
      </p>
    </div>
  );
};

export default DevelopmentActionsHeader;
