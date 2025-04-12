
import { Card, CardContent } from "@/components/ui/card";

const TalentMapLegend = () => {
  return (
    <Card className="w-72 shadow-md bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="font-medium text-base mb-3">Legend</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Zones</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-acceleration mr-3"></div>
                <span className="text-sm">Acceleration Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-development mr-3"></div>
                <span className="text-sm">Growth Zone</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-support mr-3"></div>
                <span className="text-sm">Support Zone</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Readiness</h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-ready-now mr-3"></div>
                <span className="text-sm">Ready Now</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-ready-soon mr-3"></div>
                <span className="text-sm">Ready Soon</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-not-ready mr-3"></div>
                <span className="text-sm">Not Ready</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentMapLegend;
