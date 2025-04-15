
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TalentMapControls from "../TalentMapControls";
import { useTalentMap } from "@/contexts/TalentMapContext";

const TalentMapHeader = () => {
  const { 
    zoom, 
    setZoom, 
    isPanelVisible,
    handleZoomIn,
    handleZoomOut,
    togglePanel
  } = useTalentMap();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Talent Map</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p className="text-sm">
                The Talent Map visualizes employees across zones (Acceleration, Growth, Support) 
                and readiness levels (Ready Now, Ready Soon, Not Ready). These are separate but 
                related concepts - an employee in the Acceleration zone might still be "Not Ready" 
                for promotion if they need more experience.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={togglePanel}
          className="hidden lg:flex items-center gap-1"
        >
          {isPanelVisible ? (
            <>
              <ChevronRight size={16} />
              <span>Hide Panel</span>
            </>
          ) : (
            <>
              <ChevronLeft size={16} />
              <span>Show Panel</span>
            </>
          )}
        </Button>
        <TalentMapControls 
          zoom={zoom} 
          setZoom={setZoom} 
          handleZoomIn={handleZoomIn} 
          handleZoomOut={handleZoomOut} 
        />
      </div>
    </div>
  );
};

export default TalentMapHeader;
