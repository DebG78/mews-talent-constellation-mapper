
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Employee } from "@/types/employee";

interface DevelopmentCoverageProps {
  employees: Employee[];
}

const DevelopmentCoverage = ({ employees }: DevelopmentCoverageProps) => {
  const employeesWithDevelopment = employees.filter(e => 
    e.developmentOptions && e.developmentOptions.length > 0
  );
  
  const totalWithDevelopment = employeesWithDevelopment.length;
  const percentageWithDevelopment = Math.round((totalWithDevelopment / employees.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Development Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-3xl font-bold">{percentageWithDevelopment}%</div>
          <Progress value={percentageWithDevelopment} />
          <p className="text-sm text-muted-foreground">
            {totalWithDevelopment} out of {employees.length} employees have development plans
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentCoverage;
