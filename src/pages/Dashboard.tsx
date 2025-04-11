
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getZoneDistribution, getReadinessDistribution, getDepartmentDistribution } from "@/services/mockData";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Network, Users, BarChart2 } from "lucide-react";

const Dashboard = () => {
  const zoneDistribution = getZoneDistribution();
  const readinessDistribution = getReadinessDistribution();
  const departmentDistribution = getDepartmentDistribution();

  // Format data for pie chart
  const zoneData = [
    { name: "Acceleration Zone", value: zoneDistribution.acceleration, color: "#0088CC" },
    { name: "Development Zone", value: zoneDistribution.development, color: "#FFA500" },
    { name: "Support Zone", value: zoneDistribution.support, color: "#CC0000" },
  ];

  // Format data for readiness pie chart
  const readinessData = [
    { name: "Ready Now", value: readinessDistribution.readyNow, color: "#22c55e" },
    { name: "Ready Soon", value: readinessDistribution.readySoon, color: "#eab308" },
    { name: "Not Ready", value: readinessDistribution.notReady, color: "#6b7280" },
  ];

  // Format data for department bar chart
  const departmentData = Object.entries(departmentDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Talent Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your organization's talent distribution and readiness.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <StatsCard 
            title="Total Employees" 
            value={zoneDistribution.total.toString()} 
            description="Across all zones"
            icon={<Users className="h-5 w-5 text-muted-foreground" />}
          />
          
          <StatsCard 
            title="Acceleration Zone" 
            value={zoneDistribution.acceleration.toString()} 
            description={`${Math.round((zoneDistribution.acceleration / zoneDistribution.total) * 100)}% of total`}
            icon={<Network className="h-5 w-5 text-acceleration" />}
          />
          
          <StatsCard 
            title="Ready Now Talent" 
            value={readinessDistribution.readyNow.toString()} 
            description={`${Math.round((readinessDistribution.readyNow / readinessDistribution.total) * 100)}% of total`}
            icon={<BarChart2 className="h-5 w-5 text-ready-now" />}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Zone Distribution</CardTitle>
              <CardDescription>
                Employee distribution across talent zones
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={zoneData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {zoneData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Readiness</CardTitle>
              <CardDescription>
                Promotion readiness assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={readinessData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {readinessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>
                Employees by department
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088CC" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}

const StatsCard = ({ title, value, description, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
