
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { getMomentumCategory } from "@/services/momentumService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MomentumLeaderboardProps {
  highMomentumEmployees: Employee[];
  mostImprovedEmployees: Employee[];
  departmentAverages: Record<string, number>;
  className?: string;
}

const MomentumLeaderboard = ({ 
  highMomentumEmployees, 
  mostImprovedEmployees, 
  departmentAverages,
  className 
}: MomentumLeaderboardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Momentum Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="high" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="high">Top Momentum</TabsTrigger>
            <TabsTrigger value="improved">Most Improved</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="high" className="px-4 py-2">
            <div className="space-y-3">
              {highMomentumEmployees.map((employee, index) => (
                <div key={employee.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.department}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {employee.momentumScore && (
                      <Badge style={{ backgroundColor: getMomentumCategory(employee.momentumScore.score).color }}>
                        {employee.momentumScore.score}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              {highMomentumEmployees.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6">
                  <Star className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    No high momentum employees to display
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="improved" className="px-4 py-2">
            <div className="space-y-3">
              {mostImprovedEmployees.map((employee, index) => {
                const improvement = employee.momentumScore ? 
                  employee.momentumScore.score - (employee.momentumScore.previousScore || 0) : 0;
                  
                return (
                  <div key={employee.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.department}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        +{improvement}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              
              {mostImprovedEmployees.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6">
                  <TrendingUp className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    No improvement data available
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="departments" className="px-4 py-2">
            <div className="space-y-3">
              {Object.entries(departmentAverages)
                .sort((a, b) => b[1] - a[1])
                .map(([department, average], index) => (
                  <div key={department} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full mr-3 text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="font-medium text-sm">{department}</div>
                    </div>
                    <div className="flex items-center">
                      <Badge style={{ backgroundColor: getMomentumCategory(average).color }}>
                        {average}
                      </Badge>
                    </div>
                  </div>
                ))
              }
              
              {Object.keys(departmentAverages).length === 0 && (
                <div className="flex flex-col items-center justify-center py-6">
                  <Award className="h-8 w-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    No department data available
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MomentumLeaderboard;
