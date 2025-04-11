
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";

interface TalentMapControlsProps {
  zoom: number;
  setZoom: (value: number) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

const TalentMapControls = ({
  zoom,
  setZoom,
  handleZoomIn,
  handleZoomOut
}: TalentMapControlsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={handleZoomOut}>
        <ZoomOut size={16} />
      </Button>
      <Slider 
        value={[zoom]} 
        min={0.5} 
        max={2} 
        step={0.1} 
        onValueChange={(value) => setZoom(value[0])}
        className="w-24" 
      />
      <Button variant="outline" size="sm" onClick={handleZoomIn}>
        <ZoomIn size={16} />
      </Button>
    </div>
  );
};

export default TalentMapControls;
