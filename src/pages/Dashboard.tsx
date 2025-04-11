
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getZoneDistribution, getReadinessDistribution } from "@/services/mockData";
import { Network, Users, BarChart2 } from "lucide-react";
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
