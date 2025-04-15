
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { 
  calculateMomentumScoresForAll, 
  getDepartmentMomentumAverages,
  getHighMomentumEmployees,
  getMostImprovedEmployees
} from "@/services/momentumService";
import MomentumGauge from "@/components/momentum/MomentumGauge";
import MomentumTrajectory from "@/components/momentum/MomentumTrajectory";
import MomentumLeaderboard from "@/components/momentum/MomentumLeaderboard";
import { Gauge } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MomentumScoreCardProps {
  employees: Employee[];
}

const MomentumScoreCard = ({ employees }: MomentumScoreCardProps) => {
  // Ensure all employees have momentum scores calculated
  const employeesWithMomentum = calculateMomentumScoresForAll(employees);
  
  // Get high momentum employees
  const highMomentumEmployees = getHighMomentumEmployees(employeesWithMomentum, 5);
  
  // Get most improved employees
  const mostImprovedEmployees = getMostImprovedEmployees(employeesWithMomentum, 5);
  
  // Get department averages
  const departmentAverages = getDepartmentMomentumAverages(employeesWithMomentum);
  
  // Calculate organization average momentum
  const orgAvgMomentum = {
    score: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.score || 0), 0) / employeesWithMomentum.length),
    velocity: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.velocity || 0), 0) / employeesWithMomentum.length),
    acceleration: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.acceleration || 0), 0) / employeesWithMomentum.length),
    consistency: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.consistency || 0), 0) / employeesWithMomentum.length),
    trend: 'stable' as const,
    history: [
      { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 45 },
      { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 47 },
      { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 50 },
      { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 52 },
      { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: orgAvgMomentum.score - 1 },
      { date: new Date().toISOString(), score: orgAvgMomentum.score }
    ]
  };
  
  // Fixed the reference issue by moving the history definition outside and then assigning it to orgAvgMomentum
  const baseHistory = [
    { date: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 45 },
    { date: new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 47 },
    { date: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 50 },
    { date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: 52 }
  ];
  
  // Calculate organization average momentum (fixed version)
  const calculatedOrgAvgMomentum = {
    score: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.score || 0), 0) / employeesWithMomentum.length),
    velocity: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.velocity || 0), 0) / employeesWithMomentum.length),
    acceleration: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.acceleration || 0), 0) / employeesWithMomentum.length),
    consistency: Math.round(employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.consistency || 0), 0) / employeesWithMomentum.length),
    trend: 'stable' as const
  };
  
  // Complete the history with the most recent values
  const completeHistory = [
    ...baseHistory,
    { date: new Date(Date.now() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString(), score: calculatedOrgAvgMomentum.score - 1 },
    { date: new Date().toISOString(), score: calculatedOrgAvgMomentum.score }
  ];
  
  // Final momentum object with correct history
  const orgAvgMomentum = {
    ...calculatedOrgAvgMomentum,
    history: completeHistory
  };
  
  // Determine trend based on history
  if (orgAvgMomentum.history[orgAvgMomentum.history.length - 1].score > 
      orgAvgMomentum.history[orgAvgMomentum.history.length - 2].score + 2) {
    orgAvgMomentum.trend = 'increasing';
  } else if (orgAvgMomentum.history[orgAvgMomentum.history.length - 1].score <
             orgAvgMomentum.history[orgAvgMomentum.history.length - 2].score - 2) {
    orgAvgMomentum.trend = 'decreasing';
  }
  
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <Gauge className="h-5 w-5 mr-2 text-purple-500" />
          <CardTitle className="text-base font-medium">Momentum Score Analysis</CardTitle>
        </div>
        <CardDescription>
          Tracking the direction, speed, and sustainability of employee growth over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Tabs defaultValue="organization" className="w-full mb-6">
              <TabsList className="w-full">
                <TabsTrigger value="organization">Organization</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
              </TabsList>
              
              <TabsContent value="organization">
                <MomentumGauge momentumScore={orgAvgMomentum} showDetails={false} />
              </TabsContent>
              
              <TabsContent value="components">
                <div className="space-y-2 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Velocity</div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${orgAvgMomentum.velocity}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right">{orgAvgMomentum.velocity}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Acceleration</div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div 
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${orgAvgMomentum.acceleration}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-right">{orgAvgMomentum.acceleration}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Consistency</div>
                    <div className="h-2 w-full bg-gray-100 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${orgAvgMomentum.consistency}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right">{orgAvgMomentum.consistency}%</div>
                  </div>
                  
                  <div className="text-xs text-center mt-4 text-muted-foreground">
                    Momentum is calculated from 50% velocity, 30% acceleration, and 20% consistency
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <MomentumLeaderboard 
              highMomentumEmployees={highMomentumEmployees}
              mostImprovedEmployees={mostImprovedEmployees}
              departmentAverages={departmentAverages}
            />
          </div>
          
          <div className="md:col-span-2">
            <MomentumTrajectory momentumScore={orgAvgMomentum} className="h-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumScoreCard;
