
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from "recharts";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface PerformanceTrendProps {
  data: {
    month: string;
    Acceleration: number;
    Development: number;
    Support: number;
  }[];
}

const PerformanceTrendChart = ({ data }: PerformanceTrendProps) => {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Average performance rating by zone over time
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <ExternalLink size={16} />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Acceleration" 
              stroke="#0088CC" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Development" 
              stroke="#FFA500" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="Support" 
              stroke="#CC0000" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceTrendChart;
