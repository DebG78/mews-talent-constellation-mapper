
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// In a real app, this would be replaced with actual Sankey diagram visualization
// using a library like visx, d3, or recharts-sankey
const TalentFlowSankey = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Talent Flow</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Shows talent movement between zones over time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">Movement between talent zones over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="aspect-[4/3] w-full bg-muted/20 rounded-md flex items-center justify-center border border-dashed border-muted">
          <div className="text-center p-4">
            <div className="flex justify-center space-x-8 mb-6">
              <div className="flex flex-col items-center">
                <div className="h-16 w-20 bg-blue-100 border-l-4 border-blue-500 rounded-sm mb-1 flex items-center justify-center">
                  <span className="font-medium text-sm">18</span>
                </div>
                <span className="text-xs font-medium">Acceleration</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-20 bg-amber-100 border-l-4 border-amber-500 rounded-sm mb-1 flex items-center justify-center">
                  <span className="font-medium text-sm">22</span>
                </div>
                <span className="text-xs font-medium">Growth</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-20 bg-red-100 border-l-4 border-red-500 rounded-sm mb-1 flex items-center justify-center">
                  <span className="font-medium text-sm">10</span>
                </div>
                <span className="text-xs font-medium">Support</span>
              </div>
            </div>

            {/* Simple flow visualization */}
            <div className="w-full flex justify-center relative">
              <div className="absolute top-0 left-[calc(30%-30px)] w-[40%] h-8 border-b border-l border-dashed rounded-bl-lg"></div>
              <div className="absolute top-0 right-[calc(30%-30px)] w-[40%] h-8 border-b border-r border-dashed rounded-br-lg"></div>
              <div className="absolute top-8 left-[30%] bg-blue-500/20 rounded-md py-1 px-2 text-xs">
                3 to Growth
              </div>
              <div className="absolute top-8 right-[30%] bg-red-500/20 rounded-md py-1 px-2 text-xs">
                2 to Support
              </div>
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-green-500/20 rounded-md py-1 px-2 text-xs">
                4 from Growth to Acceleration
              </div>
            </div>

            <div className="mt-28 text-xs text-muted-foreground">
              Simulated view. Full Sankey diagram would display all flow paths proportionally.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentFlowSankey;
