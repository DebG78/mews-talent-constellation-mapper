
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getZoneDistribution, getReadinessDistribution } from "@/services/mockData";
import { Network, Users, BarChart2, Gauge } from "lucide-react";
import TalentFrameworkExplainer from "@/components/talent/TalentFrameworkExplainer";

const Dashboard = () => {
  const zoneDistribution = getZoneDistribution();
  const readinessDistribution = getReadinessDistribution();

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

        {/* How We Assess Talent Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Gauge className="h-5 w-5 mr-2" /> How We Assess Talent
            </CardTitle>
            <CardDescription>
              Our talent framework uses a combination of factors to place employees in talent zones
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-3">
              We use a data-driven approach to assess talent and determine appropriate development paths:
            </p>
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="font-medium">Talent Zone Placement Formula</p>
              <p className="mt-1">70% Performance Rating + 30% Skill Enablers = Talent Zone Placement</p>
              <ul className="mt-2 pl-5 list-disc">
                <li>Performance ratings (1-5) reflect achievement against goals and impact</li>
                <li>Skill enablers assess learning agility, drive, adaptability, and innovation</li>
                <li>Combined scores determine zone placement (Acceleration, Growth, or Support)</li>
                <li>Readiness level (Ready Now, Ready Soon, Not Ready) is assessed separately</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Talent Framework Explainer */}
        <TalentFrameworkExplainer />
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
