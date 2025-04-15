
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Zap, Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for growth velocity by department
const growthVelocityData = [
  { 
    department: 'Engineering', 
    velocity: 1.8, 
    promotionRate: 16, 
    zoneMobility: 22 
  },
  { 
    department: 'Sales', 
    velocity: 2.1, 
    promotionRate: 18, 
    zoneMobility: 26 
  },
  { 
    department: 'Marketing', 
    velocity: 1.5, 
    promotionRate: 12, 
    zoneMobility: 19 
  },
  { 
    department: 'Product', 
    velocity: 1.9, 
    promotionRate: 15, 
    zoneMobility: 23 
  },
  { 
    department: 'Customer Support', 
    velocity: 1.2, 
    promotionRate: 8, 
    zoneMobility: 14 
  },
  { 
    department: 'Finance', 
    velocity: 1.3, 
    promotionRate: 9, 
    zoneMobility: 15 
  },
];

const GrowthVelocityChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Growth Velocity by Department</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Growth Velocity measures how quickly talent advances in each department, combining promotion rates and zone mobility.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">
          Measuring employee advancement speed across departments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-2 gap-2 text-xs">
          <Badge variant="outline" className="flex items-center">
            <Zap className="h-3 w-3 mr-1 text-yellow-500" />
            Company Average: 1.6
          </Badge>
          <Badge variant="outline" className="flex items-center">
            Top Performers: Sales
          </Badge>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={growthVelocityData}
              margin={{ top: 10, right: 10, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="department" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                yAxisId="left"
                orientation="left"
                stroke="#8884d8"
                label={{ value: 'Growth Velocity', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#82ca9d"
                label={{ value: 'Rate (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 12 } }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'velocity') return [`${value} points`, 'Growth Velocity'];
                  if (name === 'promotionRate') return [`${value}%`, 'Promotion Rate'];
                  if (name === 'zoneMobility') return [`${value}%`, 'Zone Mobility'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="velocity" name="Growth Velocity" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="promotionRate" name="Promotion Rate" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="zoneMobility" name="Zone Mobility" fill="#ffc658" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthVelocityChart;
