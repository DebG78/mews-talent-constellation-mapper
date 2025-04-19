
import { Employee } from "@/types/employee";
import DevelopmentCoverage from "./overview/DevelopmentCoverage";
import ActionStatusCard from "./overview/ActionStatusCard";
import StatusDistributionChart from "./overview/StatusDistributionChart";

interface DevelopmentOverviewProps {
  employees: Employee[];
}

const DevelopmentOverview = ({ employees }: DevelopmentOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <DevelopmentCoverage employees={employees} />
      <ActionStatusCard employees={employees} />
      <StatusDistributionChart employees={employees} />
    </div>
  );
};

export default DevelopmentOverview;
