
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area } from "recharts";
import { MomentumScore } from "@/types/employee";
import { getMomentumCategory } from "@/services/momentumService";
import { Info } from "lucide-react";
import { format } from "date-fns";

interface MomentumTrajectoryProps {
  momentumScore: MomentumScore;
  className?: string;
}

const MomentumTrajectory = ({ momentumScore, className }: MomentumTrajectoryProps) => {
  const { history } = momentumScore;
  const category = getMomentumCategory(momentumScore.score);
  
  if (!history || history.length < 2) {
    return (
      <Card className={className}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Growth Trajectory</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="flex flex-col items-center text-muted-foreground">
            <Info className="h-12 w-12 mb-2 opacity-50" />
            <p>Not enough data to display trajectory</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Format the data for Recharts
  const chartData = history.map(point => ({
    date: format(new Date(point.date), 'MMM yyyy'),
    score: point.score,
    // Add projected future scores with a slight trend continuation
    projected: null
  }));
  
  // Add 3 future projection points
  const lastPoint = chartData[chartData.length - 1];
  const lastScore = lastPoint.score;
  const scoreDirection = momentumScore.trend === 'increasing' ? 1 : momentumScore.trend === 'decreasing' ? -1 : 0;
  const projectionMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Get last used month to ensure we continue from there
  const lastMonth = lastPoint.date.split(' ')[0];
  const lastMonthIndex = projectionMonths.indexOf(lastMonth);
  
  for (let i = 1; i <= 3; i++) {
    const monthIndex = (lastMonthIndex + i) % projectionMonths.length;
    const projectedScore = Math.max(0, Math.min(100, lastScore + (scoreDirection * i * 5)));
    
    chartData.push({
      date: `${projectionMonths[monthIndex]} ${new Date().getFullYear()}`,
      score: null,
      projected: projectedScore
    });
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Growth Trajectory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }} 
                tickCount={5}
                tickMargin={5}
              />
              <Tooltip 
                formatter={(value) => [value, 'Momentum Score']}
                labelFormatter={(label) => `${label}`}
              />
              
              {/* Historical trajectory */}
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke={category.color} 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              
              {/* Projected trajectory */}
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke={category.color} 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
                connectNulls
              />
              
              {/* Momentum band (area around the line) */}
              <Area 
                type="monotone"
                dataKey="score"
                stroke="none"
                fill={category.color}
                fillOpacity={0.1}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gray-800 mr-1"></div>
            <span className="text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-0.5 bg-gray-800 mr-1 border-b border-dashed border-gray-800"></div>
            <span className="text-muted-foreground">Projected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumTrajectory;
