
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DepartmentBreakdownProps {
  data: {
    name: string;
    Acceleration: number;
    Growth: number;
    Support: number;
  }[];
}

const DepartmentBreakdownChart = ({ data }: DepartmentBreakdownProps) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Department Breakdown</CardTitle>
        <CardDescription>
          Zone distribution by department
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Acceleration" name="Acceleration Zone" stackId="a" fill="#0088CC" />
            <Bar dataKey="Growth" name="Growth Zone" stackId="a" fill="#FFA500" />
            <Bar dataKey="Support" name="Support Zone" stackId="a" fill="#CC0000" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentBreakdownChart;
