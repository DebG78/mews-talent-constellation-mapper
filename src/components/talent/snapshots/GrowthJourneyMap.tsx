
import React from "react";
import { Employee, EmployeeSnapshot } from "@/types/employee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";
import { Briefcase, TrendingUp, AlertTriangle } from "lucide-react";

interface GrowthJourneyMapProps {
  employee: Employee;
}

// Convert zone to numeric value for chart
const zoneToValue = (zone: string): number => {
  switch (zone) {
    case 'Acceleration': return 3;
    case 'Growth': return 2;
    case 'Support': return 1;
    default: return 0;
  }
};

// Convert snapshot to chart data
const mapSnapshotToChartData = (snapshot: EmployeeSnapshot) => {
  const date = new Date(snapshot.dateCreated);
  return {
    id: snapshot.id,
    date: date,
    formattedDate: format(date, 'MMM yyyy'),
    zone: snapshot.zonePosition.zone,
    zoneValue: zoneToValue(snapshot.zonePosition.zone),
    performance: snapshot.performanceRating,
    context: snapshot.context,
    readiness: snapshot.readiness
  };
};

const GrowthJourneyMap = ({ employee }: GrowthJourneyMapProps) => {
  // Check if employee has snapshots
  if (!employee.snapshots || employee.snapshots.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Growth Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mb-2 opacity-30" />
            <p>No historical snapshots available</p>
            <p className="text-xs mt-1">Use the Snapshots feature to start tracking this employee's growth journey</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Add current state to snapshots for complete journey
  const journeyData = [...employee.snapshots].map(mapSnapshotToChartData);
  
  // Sort by date
  journeyData.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get key metrics
  const latestZone = journeyData.length > 0 ? journeyData[journeyData.length - 1].zone : 'N/A';
  const hasImproved = journeyData.length > 1 && 
    journeyData[journeyData.length - 1].zoneValue > journeyData[0].zoneValue;
  const zoneChanges = journeyData.reduce((count, item, index, arr) => {
    if (index > 0 && item.zone !== arr[index - 1].zone) return count + 1;
    return count;
  }, 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Growth Journey</CardTitle>
          <div className="flex gap-2">
            <Badge variant={hasImproved ? "default" : "outline"} className="text-xs">
              {hasImproved ? "Improving" : "Stable"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {zoneChanges} Zone Change{zoneChanges !== 1 ? 's' : ''}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={journeyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="formattedDate" 
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  domain={[0, 4]}
                  ticks={[1, 2, 3]}
                  tickFormatter={(value) => {
                    switch(value) {
                      case 1: return 'Support';
                      case 2: return 'Growth';
                      case 3: return 'Acceleration';
                      default: return '';
                    }
                  }}
                />
                <Tooltip
                  formatter={(value, name, props) => {
                    if (name === 'zoneValue') {
                      const item = journeyData.find(d => d.formattedDate === props.payload.formattedDate);
                      return [item?.zone || '', 'Zone'];
                    }
                    if (name === 'performance') return [`${value}/5`, 'Performance'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => {
                    const item = journeyData.find(d => d.formattedDate === label);
                    return `${label} - ${item?.context || ''}`;
                  }}
                />
                <ReferenceLine y={3} stroke="#0088cc" strokeDasharray="3 3" />
                <ReferenceLine y={2} stroke="#ffa500" strokeDasharray="3 3" />
                <ReferenceLine y={1} stroke="#cc0000" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="zoneValue"
                  name="zoneValue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="performance"
                  name="performance"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="border rounded-md p-3">
              <TrendingUp className="h-4 w-4 mx-auto mb-1" />
              <div className="text-sm font-medium">{latestZone}</div>
              <div className="text-xs text-muted-foreground">Current Zone</div>
            </div>
            <div className="border rounded-md p-3">
              <Briefcase className="h-4 w-4 mx-auto mb-1" />
              <div className="text-sm font-medium">{format(new Date(employee.joinDate), 'MMM yyyy')}</div>
              <div className="text-xs text-muted-foreground">Join Date</div>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-sm font-medium">{journeyData.length}</div>
              <div className="text-xs text-muted-foreground">Review Points</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthJourneyMap;
