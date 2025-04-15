
import React from "react";
import { MomentumScore } from "@/types/employee";
import { getMomentumCategory } from "@/services/momentumService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MomentumGaugeProps {
  momentumScore: MomentumScore;
  showDetails?: boolean;
  className?: string;
}

const MomentumGauge = ({ momentumScore, showDetails = false, className }: MomentumGaugeProps) => {
  const { score, trend, velocity, acceleration, consistency } = momentumScore;
  const category = getMomentumCategory(score);
  
  // Calculate the angle for the gauge needle based on score
  const angle = -90 + (score / 100 * 180);
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'decreasing':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <span>Momentum Score</span>
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative w-full aspect-[2/1] mt-2">
          {/* Gauge background */}
          <div className="absolute inset-0 rounded-full bg-gray-100 overflow-hidden" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' }}>
            {/* Color segments */}
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-40"></div>
          </div>
          
          {/* Center point */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full"></div>
          
          {/* Gauge needle */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom h-[95%] w-1 bg-gray-800"
            style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          >
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
          
          {/* Score value */}
          <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            {score}
          </div>
          
          {/* Category label */}
          <div 
            className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-sm font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: category.color, color: 'white' }}
          >
            {category.label}
          </div>
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-3 gap-2 mt-6 text-center">
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Velocity</div>
              <div className="text-lg font-semibold">{velocity}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Acceleration</div>
              <div className="text-lg font-semibold">{acceleration}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Consistency</div>
              <div className="text-lg font-semibold">{consistency}</div>
            </div>
          </div>
        )}
        
        <div className="mt-3 text-xs text-center text-muted-foreground">
          {category.description}
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumGauge;
