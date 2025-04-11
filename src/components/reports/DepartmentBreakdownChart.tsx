
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from "recharts";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface DepartmentBreakdownProps {
  data: {
    name: string;
    Acceleration: number;
    Development: number;
    Support: number;
  }[];
}

const DepartmentBreakdownChart = ({ data }: DepartmentBreakdownProps) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Department Breakdown</CardTitle>
          <CardDescription>
            Zone distribution by department
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <ExternalLink size={16} />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Acceleration" stackId="a" fill="#0088CC" />
            <Bar dataKey="Development" stackId="a" fill="#FFA500" />
            <Bar dataKey="Support" stackId="a" fill="#CC0000" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentBreakdownChart;
