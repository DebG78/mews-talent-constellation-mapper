
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Unplug, Plug } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ConstellationControlsProps {
  zoom: number;
  setZoom: (zoom: number) => void;
  showSkillEnablers?: boolean;
  toggleSkillEnablers?: () => void;
}

const ConstellationControls = ({ 
  zoom, 
  setZoom, 
  showSkillEnablers = true,
  toggleSkillEnablers
}: ConstellationControlsProps) => {
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.2, 0.5));
  };

  return (
    <div className="flex items-center space-x-4">
      {toggleSkillEnablers && (
        <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2">
            {showSkillEnablers ? 
              <Plug size={16} className="text-mews-navy" /> : 
              <Unplug size={16} className="text-mews-navy" />
            }
            <Switch 
              checked={showSkillEnablers} 
              onCheckedChange={toggleSkillEnablers} 
              id="skill-enablers" 
            />
            <Label htmlFor="skill-enablers" className="text-xs whitespace-nowrap">
              Skill Enablers
            </Label>
          </div>
        </div>
      )}
      
      <div className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-sm border border-gray-200">
        <Button variant="ghost" size="icon" onClick={handleZoomOut} className="rounded-full h-8 w-8">
          <ZoomOut size={16} className="text-mews-navy" />
        </Button>
        <Slider 
          value={[zoom]} 
          min={0.5} 
          max={2} 
          step={0.1} 
          onValueChange={(value) => setZoom(value[0])}
          className="w-24" 
        />
        <Button variant="ghost" size="icon" onClick={handleZoomIn} className="rounded-full h-8 w-8">
          <ZoomIn size={16} className="text-mews-navy" />
        </Button>
      </div>
    </div>
  );
};

export default ConstellationControls;
