
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HelpCircle } from "lucide-react";

const FrameworkDescription = () => {
  return (
    <div className="text-md font-medium flex items-center gap-2">
      Understanding Our Talent Framework
      <HoverCard>
        <HoverCardTrigger asChild>
          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Talent Acceleration Framework</h4>
            <p className="text-xs text-muted-foreground">
              Our framework helps identify, develop, and retain top talent by assessing skill enablers
              and performance ratings to map employees across zones and readiness levels.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default FrameworkDescription;
