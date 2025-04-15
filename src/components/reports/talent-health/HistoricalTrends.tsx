
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip as RechartTooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  { date: "Apr 2024", acceleration: 15, growth: 25, support: 10, events: [] },
  { date: "May 2024", acceleration: 17, growth: 24, support: 9, events: [] },
  { date: "Jun 2024", acceleration: 16, growth: 25, support: 9, events: [] },
  { date: "Jul 2024", acceleration: 18, growth: 24, support: 8, events: ["Leadership Program"] },
  { date: "Aug 2024", acceleration: 19, growth: 22, support: 9, events: [] },
  { date: "Sep 2024", acceleration: 17, growth: 23, support: 10, events: ["Reorganization"] },
  { date: "Oct 2024", acceleration: 16, growth: 23, support: 11, events: [] },
  { date: "Nov 2024", acceleration: 17, growth: 22, support: 11, events: [] },
  { date: "Dec 2024", acceleration: 18, growth: 21, support: 11, events: ["Year-End Review"] },
  { date: "Jan 2025", acceleration: 17, growth: 22, support: 11, events: [] },
  { date: "Feb 2025", acceleration: 18, growth: 22, support: 10, events: [] },
  { date: "Mar 2025", acceleration: 18, growth: 22, support: 10, events: ["Team Building"] },
  { date: "Apr 2025", acceleration: 19, growth: 21, support: 10, events: [] },
];

const keyEvents = [
  { date: "Jul 2024", event: "Leadership Development Program", impact: "Increased Acceleration Zone by 2%" },
  { date: "Sep 2024", event: "Department Reorganization", impact: "Temporary decrease in Growth Zone" },
  { date: "Dec 2024", event: "Annual Performance Reviews", impact: "Zone redistributions across the organization" },
  { date: "Mar 2025", event: "Team Building Workshop", impact: "Improved collaboration scores across zones" },
];

const performanceData = [
  { date: "Apr 2024", average: 3.6 },
  { date: "May 2024", average: 3.7 },
  { date: "Jun 2024", average: 3.7 },
  { date: "Jul 2024", average: 3.8 },
  { date: "Aug 2024", average: 3.9 },
  { date: "Sep 2024", average: 3.8 },
  { date: "Oct 2024", average: 3.7 },
  { date: "Nov 2024", average: 3.7 },
  { date: "Dec 2024", average: 3.8 },
  { date: "Jan 2025", average: 3.8 },
  { date: "Feb 2025", average: 3.9 },
  { date: "Mar 2025", average: 4.0 },
  { date: "Apr 2025", average: 4.1 },
];

const HistoricalTrends = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Historical Trends</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <History className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Historical trend analysis with key event markers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">12-month historical data with key organizational events</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="zones" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="zones" className="flex-1">Zone Trends</TabsTrigger>
            <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
            <TabsTrigger value="events" className="flex-1">Key Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="zones">
            <div className="h-[200px] mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis hide />
                  <RechartTooltip 
                    formatter={(value, name) => {
                      return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                    }}
                    labelFormatter={(label, items) => {
                      const dataPoint = data.find(d => d.date === label);
                      if (dataPoint?.events && dataPoint.events.length > 0) {
                        return `${label} (${dataPoint.events.join(", ")})`;
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="acceleration" 
                    stroke="#0088CC" 
                    name="Acceleration"
                    strokeWidth={2}
                    dot={(props) => {
                      const dataPoint = data[props.index];
                      if (dataPoint.events && dataPoint.events.length > 0) {
                        return (
                          <circle 
                            cx={props.cx} 
                            cy={props.cy} 
                            r={4} 
                            fill="#0088CC" 
                            stroke="#fff" 
                            strokeWidth={2} 
                          />
                        );
                      }
                      return <circle cx={props.cx} cy={props.cy} r={2} fill="#0088CC" />;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="#FFA500" 
                    name="Growth"
                    strokeWidth={2}
                    dot={(props) => {
                      const dataPoint = data[props.index];
                      if (dataPoint.events && dataPoint.events.length > 0) {
                        return (
                          <circle 
                            cx={props.cx} 
                            cy={props.cy} 
                            r={4} 
                            fill="#FFA500" 
                            stroke="#fff" 
                            strokeWidth={2} 
                          />
                        );
                      }
                      return <circle cx={props.cx} cy={props.cy} r={2} fill="#FFA500" />;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="support" 
                    stroke="#CC0000" 
                    name="Support"
                    strokeWidth={2}
                    dot={(props) => {
                      const dataPoint = data[props.index];
                      if (dataPoint.events && dataPoint.events.length > 0) {
                        return (
                          <circle 
                            cx={props.cx} 
                            cy={props.cy} 
                            r={4} 
                            fill="#CC0000" 
                            stroke="#fff" 
                            strokeWidth={2} 
                          />
                        );
                      }
                      return <circle cx={props.cx} cy={props.cy} r={2} fill="#CC0000" />;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground">
              Note: Larger dots indicate months with key organizational events
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="h-[200px] mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis domain={[3, 5]} tick={{ fontSize: 10 }} />
                  <RechartTooltip 
                    formatter={(value) => [`${value} / 5.0`, "Avg Performance Rating"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground">
              Average performance rating across all employees over time
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="space-y-3 max-h-[200px] overflow-auto pr-2">
              {keyEvents.map((event, index) => (
                <div key={index} className="border rounded-md p-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{event.event}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </div>
                  <div className="text-xs mt-1">{event.impact}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HistoricalTrends;
