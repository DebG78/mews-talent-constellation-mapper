
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip } from "recharts";

const data = [
  { quarter: "Q2 2025", ready: 3, readySoon: 5, notReady: 7 },
  { quarter: "Q3 2025", ready: 4, readySoon: 6, notReady: 5 },
  { quarter: "Q4 2025", ready: 6, readySoon: 7, notReady: 2 },
  { quarter: "Q1 2026", ready: 7, readySoon: 6, notReady: 2 },
  { quarter: "Q2 2026", ready: 8, readySoon: 4, notReady: 2 },
  { quarter: "Q3 2026", ready: 9, readySoon: 3, notReady: 2 },
  { quarter: "Q4 2026", ready: 10, readySoon: 2, notReady: 1 },
  { quarter: "Q1 2027", ready: 11, readySoon: 2, notReady: 1 },
];

const PromotionPipeline = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Promotion Pipeline Forecast</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Predicts internal promotion readiness over next 8 quarters</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">Projected promotion-ready talent for next 8 quarters</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              stackOffset="expand"
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <RechartTooltip 
                formatter={(value, name) => {
                  const formattedName = name === "ready" 
                    ? "Ready Now" 
                    : name === "readySoon" 
                      ? "Ready Soon" 
                      : "Not Ready";
                  return [value, formattedName];
                }} 
              />
              <Bar dataKey="ready" name="Ready Now" stackId="a" fill="#22c55e" />
              <Bar dataKey="readySoon" name="Ready Soon" stackId="a" fill="#eab308" />
              <Bar dataKey="notReady" name="Not Ready" stackId="a" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionPipeline;
