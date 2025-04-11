
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, User, Wrench } from "lucide-react";

const ConstellationLegend = () => {
  return (
    <Card className="w-60 shadow-md bg-white/95 backdrop-blur-sm text-mews-navy border-gray-200">
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
            <h4 className="text-xs font-medium">Employee Type</h4>
            <div className="grid grid-cols-1 gap-1">
              <div className="flex items-center">
                <div className="mr-2 text-yellow-400"><Sparkles size={14} /></div>
                <span className="text-xs">Emerging Leader</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-orange-500"><Wrench size={14} /></div>
                <span className="text-xs">Innovator</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 text-mews-navy"><User size={14} /></div>
                <span className="text-xs">Standard</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConstellationLegend;
