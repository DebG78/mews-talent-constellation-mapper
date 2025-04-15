
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowBigDownDash, ArrowBigUpDash, ArrowRightCircle, TrendingUp } from "lucide-react";
import { Employee } from "@/types/employee";
import MomentumScoreExplainer from "@/components/momentum/MomentumScoreExplainer";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MomentumScoreCardProps {
  employees: Employee[];
}

const MomentumScoreCard = ({ employees }: MomentumScoreCardProps) => {
  // Filter employees with momentum scores and sort by score descending
  const employeesWithMomentum = employees
    .filter(employee => employee.momentumScore)
    .sort((a, b) => (b.momentumScore?.score || 0) - (a.momentumScore?.score || 0));

  // Top performers (top 5)
  const topPerformers = employeesWithMomentum.slice(0, 5);

  // Get overall average momentum score
  const avgMomentumScore = Math.round(
    employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.score || 0), 0) / 
    employeesWithMomentum.length
  );

  // Get average component scores
  const avgVelocity = Math.round(
    employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.velocity || 0), 0) / 
    employeesWithMomentum.length
  );
  
  const avgAcceleration = Math.round(
    employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.acceleration || 0), 0) / 
    employeesWithMomentum.length
  );
  
  const avgConsistency = Math.round(
    employeesWithMomentum.reduce((sum, emp) => sum + (emp.momentumScore?.consistency || 0), 0) / 
    employeesWithMomentum.length
  );

  // Create a dataset for overall company momentum trend
  // First, collect all history points across employees
  const allHistoryPoints = employeesWithMomentum.flatMap(emp => 
    emp.momentumScore?.history || []
  );
  
  // Group by date and calculate average
  const historyByDate = allHistoryPoints.reduce((acc, point) => {
    const date = point.date.substring(0, 7); // YYYY-MM format
    if (!acc[date]) {
      acc[date] = { date, totalScore: 0, count: 0 };
    }
    acc[date].totalScore += point.score;
    acc[date].count += 1;
    return acc;
  }, {} as Record<string, { date: string; totalScore: number; count: number }>);
  
  // Create final history array with averaged scores
  const completeHistory = Object.values(historyByDate)
    .map(item => ({
      date: item.date,
      score: Math.round(item.totalScore / item.count)
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Determine overall company trend
  const companyTrend: 'increasing' | 'stable' | 'decreasing' = 
    completeHistory.length >= 2 
      ? (completeHistory[completeHistory.length - 1].score > completeHistory[completeHistory.length - 2].score 
        ? 'increasing' 
        : completeHistory[completeHistory.length - 1].score < completeHistory[completeHistory.length - 2].score 
          ? 'decreasing' 
          : 'stable')
      : 'stable';

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
          Momentum Score Analysis
        </CardTitle>
        <CardDescription>
          Tracking growth trajectory and performance momentum across the organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm">Organization Momentum</h3>
                {companyTrend === 'increasing' && (
                  <ArrowBigUpDash className="h-5 w-5 text-green-500" />
                )}
                {companyTrend === 'stable' && (
                  <ArrowRightCircle className="h-5 w-5 text-amber-500" />
                )}
                {companyTrend === 'decreasing' && (
                  <ArrowBigDownDash className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-1">{avgMomentumScore}</div>
              <div className="text-sm text-blue-600">
                {companyTrend === 'increasing' 
                  ? 'Increasing organization momentum' 
                  : companyTrend === 'decreasing' 
                    ? 'Decreasing organization momentum' 
                    : 'Stable organization momentum'}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-blue-100">
                <div>
                  <div className="text-xs text-blue-600">Velocity</div>
                  <div className="text-lg font-semibold">{avgVelocity}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600">Acceleration</div>
                  <div className="text-lg font-semibold">{avgAcceleration}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-600">Consistency</div>
                  <div className="text-lg font-semibold">{avgConsistency}</div>
                </div>
              </div>
            </div>
            
            <MomentumScoreExplainer className="mt-4" />
          </div>
          
          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="trend">
              <TabsList className="mb-4">
                <TabsTrigger value="trend">Momentum Trend</TabsTrigger>
                <TabsTrigger value="topPerformers">Top Performers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trend" className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={completeHistory}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const [year, month] = date.split('-');
                        return `${month}/${year.substring(2)}`;
                      }} 
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [`${value}`, 'Momentum Score']}
                      labelFormatter={(date) => {
                        const [year, month] = date.split('-');
                        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        return `${months[parseInt(month) - 1]} ${year}`;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#0088CC" 
                      strokeWidth={2}
                      dot={{ stroke: '#0088CC', strokeWidth: 2, r: 4 }}
                      activeDot={{ stroke: '#005580', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="topPerformers">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Momentum Score</TableHead>
                      <TableHead className="text-right">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell className="text-right">{employee.momentumScore?.score}</TableCell>
                        <TableCell className="text-right">
                          {employee.momentumScore?.trend === 'increasing' && (
                            <ArrowBigUpDash className="h-4 w-4 text-green-500 ml-auto" />
                          )}
                          {employee.momentumScore?.trend === 'stable' && (
                            <ArrowRightCircle className="h-4 w-4 text-amber-500 ml-auto" />
                          )}
                          {employee.momentumScore?.trend === 'decreasing' && (
                            <ArrowBigDownDash className="h-4 w-4 text-red-500 ml-auto" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MomentumScoreCard;
