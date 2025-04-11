
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { mockEmployees, getZoneDistribution, getReadinessDistribution, getDepartmentDistribution } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const Reports = () => {
  // Generate zone distribution data for pie chart
  const zoneData = [
    { name: 'Acceleration', value: mockEmployees.filter(e => e.zonePosition.zone === 'Acceleration').length, color: '#0088CC' },
    { name: 'Development', value: mockEmployees.filter(e => e.zonePosition.zone === 'Development').length, color: '#FFA500' },
    { name: 'Support', value: mockEmployees.filter(e => e.zonePosition.zone === 'Support').length, color: '#CC0000' },
  ];

  // Generate department data by zone
  const departments = Array.from(new Set(mockEmployees.map(e => e.department)));
  const departmentData = departments.map(dept => {
    const empInDept = mockEmployees.filter(e => e.department === dept);
    return {
      name: dept,
      Acceleration: empInDept.filter(e => e.zonePosition.zone === 'Acceleration').length,
      Development: empInDept.filter(e => e.zonePosition.zone === 'Development').length,
      Support: empInDept.filter(e => e.zonePosition.zone === 'Support').length,
    };
  });

  // Generate performance trend data (simulated historical data)
  const performanceTrendData = [
    { month: 'Jan', Acceleration: 3.8, Development: 3.2, Support: 2.5 },
    { month: 'Feb', Acceleration: 3.9, Development: 3.3, Support: 2.4 },
    { month: 'Mar', Acceleration: 4.0, Development: 3.2, Support: 2.3 },
    { month: 'Apr', Acceleration: 4.1, Development: 3.3, Support: 2.4 },
    { month: 'May', Acceleration: 4.2, Development: 3.5, Support: 2.5 },
    { month: 'Jun', Acceleration: 4.3, Development: 3.4, Support: 2.6 },
  ];

  // Get data for additional charts moved from Dashboard
  const zoneDistribution = getZoneDistribution();
  const readinessDistribution = getReadinessDistribution();
  const departmentDistribution = getDepartmentDistribution();

  // Format data for pie chart
  const zonePieData = [
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
  const departmentBarData = Object.entries(departmentDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Analyze talent distribution and performance trends across the organization.
            </p>
          </div>
          <Button>
            <Download size={16} className="mr-2" />
            Export All
          </Button>
        </div>

        {/* Distribution by Zone, Readiness, and Department (Moved from Dashboard) */}
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
                    data={zonePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {zonePieData.map((entry, index) => (
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
                <BarChart data={departmentBarData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088CC" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Zone Distribution Card */}
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Zone Distribution</CardTitle>
                <CardDescription>
                  Employees across talent zones
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <ExternalLink size={16} />
              </Button>
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
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Breakdown Card */}
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
                  data={departmentData}
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

          {/* Performance Trends Card */}
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
                <LineChart data={performanceTrendData}>
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
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          {/* Key Insights Card */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>
                Automatically generated insights based on your talent data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-semibold text-blue-700 mb-1">Acceleration Zone</h3>
                <p className="text-blue-600 text-sm">
                  {zoneData[0].value} employees ({Math.round((zoneData[0].value / mockEmployees.length) * 100)}% of total) are in the Acceleration Zone. 
                  {zoneData[0].value > mockEmployees.length * 0.3 
                    ? " This is higher than the recommended 25-30% benchmark." 
                    : " This is within the recommended 25-30% benchmark."}
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md">
                <h3 className="font-semibold text-amber-700 mb-1">Ready Now Talent</h3>
                <p className="text-amber-600 text-sm">
                  {mockEmployees.filter(e => e.readiness === 'Ready Now').length} employees ({Math.round((mockEmployees.filter(e => e.readiness === 'Ready Now').length / mockEmployees.length) * 100)}%) are rated as Ready Now. 
                  Ensure succession plans are in place for these high-potential individuals.
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-md">
                <h3 className="font-semibold text-red-700 mb-1">Risk Areas</h3>
                <p className="text-red-600 text-sm">
                  The {departments[Math.floor(Math.random() * departments.length)]} department has the highest percentage of employees in the Support Zone. 
                  Consider targeted development interventions and additional coaching resources.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
