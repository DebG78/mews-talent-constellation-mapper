
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// Define proper types for our data
interface BaseDataPoint {
  month: string;
  acceleration: number;
  growth: number;
  support: number;
}

interface PredictiveDataPoint extends BaseDataPoint {
  isPrediction?: boolean;
}

// Mock data for predictive trends
const baseData: BaseDataPoint[] = [
  { month: 'Apr', acceleration: 18, growth: 22, support: 10 },
  { month: 'May', acceleration: 19, growth: 22, support: 9 },
  { month: 'Jun', acceleration: 19, growth: 23, support: 8 },
  { month: 'Jul', acceleration: 20, growth: 22, support: 8 },
  { month: 'Aug', acceleration: 21, growth: 21, support: 8 },
  { month: 'Sep', acceleration: 22, growth: 21, support: 7 },
];

// Generate predictive data based on development investment slider
const generatePredictiveData = (investmentLevel: number): PredictiveDataPoint[] => {
  // Clone base data
  const data: PredictiveDataPoint[] = [...baseData];
  
  // Calculate future months based on investment level
  // Higher investment = better distribution (more acceleration, less support)
  const futureMonths = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  
  let lastAcc = data[data.length - 1].acceleration;
  let lastGrowth = data[data.length - 1].growth;
  let lastSupport = data[data.length - 1].support;
  
  futureMonths.forEach(month => {
    // Apply different growth rates based on investment level
    const accGrowth = 0.5 + (investmentLevel * 0.1);
    const growthChange = -0.2 + (investmentLevel * 0.05);
    const supportReduction = 0.2 + (investmentLevel * 0.1);
    
    lastAcc = Math.round(lastAcc + accGrowth);
    lastGrowth = Math.round(lastGrowth + growthChange);
    lastSupport = Math.max(0, Math.round(lastSupport - supportReduction));
    
    data.push({
      month,
      acceleration: lastAcc,
      growth: lastGrowth,
      support: lastSupport,
      isPrediction: true
    });
  });
  
  return data;
};

const PredictiveModeling = () => {
  const [investmentLevel, setInvestmentLevel] = useState([3]);
  const predictiveData = generatePredictiveData(investmentLevel[0]);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Predictive Zone Distribution</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Predictive modeling for future zone distribution</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">
          Projected talent zone distribution based on development investment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label className="text-xs font-medium mb-2 block">Development Investment Level</label>
          <Slider
            value={investmentLevel}
            onValueChange={setInvestmentLevel}
            max={5}
            min={1}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Minimal</span>
            <span>Moderate</span>
            <span>Significant</span>
          </div>
        </div>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={predictiveData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                formatter={(value, name) => {
                  if (typeof name === 'string') {
                    return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => {
                  const dataPoint = predictiveData.find(d => d.month === label);
                  return `${label}${dataPoint?.isPrediction ? ' (Predicted)' : ''}`;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="acceleration" 
                stroke="#0088CC" 
                name="Acceleration"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="growth" 
                stroke="#FFA500" 
                name="Growth"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="support" 
                stroke="#CC0000" 
                name="Support"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveModeling;
