
import { Card, CardContent } from "@/components/ui/card";

const TalentMapLegend = () => {
  return (
    <Card className="w-60 shadow-md bg-white/90 backdrop-blur-sm">
      <CardContent className="p-3">
        <h3 className="font-medium text-sm mb-2">Legend</h3>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="text-xs font-medium">Zones</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-acceleration mr-2"></div>
                <span className="text-xs">Acceleration Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-development mr-2"></div>
                <span className="text-xs">Development Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-support mr-2"></div>
                <span className="text-xs">Support Zone</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-xs font-medium">Readiness</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-ready-now mr-2"></div>
                <span className="text-xs">Ready Now</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-ready-soon mr-2"></div>
                <span className="text-xs">Ready Soon</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-not-ready mr-2"></div>
                <span className="text-xs">Not Ready</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentMapLegend;
