
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoIcon, TrendingUp, ZapIcon, ActivityIcon } from "lucide-react";

interface MomentumScoreExplainerProps {
  className?: string;
}

const MomentumScoreExplainer = ({ className }: MomentumScoreExplainerProps) => {
  return (
    <Card className={className}>
      <CardContent className="pt-4">
        <div className="flex items-center mb-3">
          <InfoIcon className="h-4 w-4 mr-2 text-blue-500" />
          <h3 className="text-sm font-medium">Understanding Momentum Score</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">
          The Momentum Score measures an employee's overall growth trajectory, combining three key factors:
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="velocity">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                <span>Velocity (50%)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              Measures the speed of progress in skills, performance, and impact. 
              High velocity indicates rapid professional growth and quick adaptation to new responsibilities.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="acceleration">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <ZapIcon className="h-4 w-4 mr-2 text-purple-500" />
                <span>Acceleration (30%)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              Tracks the rate of change in velocity—whether an employee's growth is speeding up, 
              maintaining pace, or slowing down. High acceleration suggests increasing momentum 
              and potential for significant future growth.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="consistency">
            <AccordionTrigger className="text-sm py-2">
              <div className="flex items-center">
                <ActivityIcon className="h-4 w-4 mr-2 text-green-500" />
                <span>Consistency (20%)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              Evaluates stability in performance and growth over time. 
              High consistency indicates reliable, sustainable improvement without significant fluctuations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
          <p>
            Momentum Score helps leaders identify high-potential employees and predict future performance, 
            enabling more strategic talent development and succession planning.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumScoreExplainer;
