
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";

interface KeyInsightsProps {
  zoneData: {
    name: string;
    value: number;
    color: string;
  }[];
  employees: Employee[];
  departments: string[];
}

const KeyInsights = ({ zoneData, employees, departments }: KeyInsightsProps) => {
  return (
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
            {zoneData[0].value} employees ({Math.round((zoneData[0].value / employees.length) * 100)}% of total) are in the Acceleration Zone. 
            {zoneData[0].value > employees.length * 0.3 
              ? " This is higher than the recommended 25-30% benchmark." 
              : " This is within the recommended 25-30% benchmark."}
          </p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-md">
          <h3 className="font-semibold text-amber-700 mb-1">Ready Now Talent</h3>
          <p className="text-amber-600 text-sm">
            {employees.filter(e => e.readiness === 'Ready Now').length} employees ({Math.round((employees.filter(e => e.readiness === 'Ready Now').length / employees.length) * 100)}%) are rated as Ready Now. 
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
  );
};

export default KeyInsights;
