
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartTooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const genderData = [
  { name: "Male", value: 28, color: "#8B5CF6" },
  { name: "Female", value: 18, color: "#EC4899" },
  { name: "Non-binary", value: 4, color: "#0EA5E9" },
];

const ethnicityData = [
  { name: "White", value: 22, color: "#8B5CF6" },
  { name: "Asian", value: 12, color: "#EC4899" },
  { name: "Black", value: 8, color: "#0EA5E9" },
  { name: "Hispanic", value: 6, color: "#22C55E" },
  { name: "Other", value: 2, color: "#F97316" },
];

const ageData = [
  { name: "18-24", value: 5, color: "#8B5CF6" },
  { name: "25-34", value: 18, color: "#EC4899" },
  { name: "35-44", value: 15, color: "#0EA5E9" },
  { name: "45-54", value: 9, color: "#22C55E" },
  { name: "55+", value: 3, color: "#F97316" },
];

const DiversityDistribution = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Diversity Distribution</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Representation analysis across zones and levels</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">Demographic representation across organizational zones</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gender" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="gender" className="flex-1">Gender</TabsTrigger>
            <TabsTrigger value="ethnicity" className="flex-1">Ethnicity</TabsTrigger>
            <TabsTrigger value="age" className="flex-1">Age</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gender" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="ethnicity" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ethnicityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ethnicityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="age" className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DiversityDistribution;
