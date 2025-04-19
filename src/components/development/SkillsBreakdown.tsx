
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Book } from "lucide-react";

interface SkillsBreakdownProps {
  employees: Employee[];
}

const SkillsBreakdown = ({ employees }: SkillsBreakdownProps) => {
  const skillCategories = [
    'Technical Skills',
    'Leadership',
    'Communication',
    'Project Management',
    'Other'
  ];

  const mockSkillData = skillCategories.map((category, index) => ({
    name: category,
    value: Math.floor(Math.random() * 50) + 10 // Mock data for visualization
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Skills Being Developed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockSkillData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {mockSkillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsBreakdown;
