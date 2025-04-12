
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

interface PerformanceTrendChartProps {
  data: {
    month: string;
    Acceleration: number;
    Growth: number;
    Support: number;
  }[];
}

const PerformanceTrendChart = ({ data }: PerformanceTrendChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>
          Average performance by zone
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 20 }}>
            <XAxis dataKey="month" />
            <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Acceleration" 
              name="Acceleration Zone" 
              stroke="#0088CC" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Growth" 
              name="Growth Zone" 
              stroke="#FFA500" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Support" 
              name="Support Zone" 
              stroke="#CC0000" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrendChart;
