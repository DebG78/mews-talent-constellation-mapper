
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, ReferenceLine } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const benchmarkData = {
  "Talent Distribution": [
    { name: "Acceleration Zone", company: 36, industry: 25 },
    { name: "Growth Zone", company: 44, industry: 50 },
    { name: "Support Zone", company: 20, industry: 25 },
  ],
  "Promotion Readiness": [
    { name: "Ready Now", company: 32, industry: 20 },
    { name: "Ready Soon", company: 42, industry: 35 },
    { name: "Not Ready", company: 26, industry: 45 },
  ],
  "Skill Enablers": [
    { name: "Drive", company: 4.2, industry: 3.8 },
    { name: "Learning Agility", company: 3.9, industry: 3.5 },
    { name: "Innovation", company: 3.7, industry: 3.6 },
    { name: "Adaptability", company: 4.0, industry: 3.7 },
  ],
};

const ComparativeBenchmarks = () => {
  const [benchmarkType, setBenchmarkType] = useState("Talent Distribution");
  const data = benchmarkData[benchmarkType as keyof typeof benchmarkData];
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Industry Benchmarks</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <GitCompare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Comparative views against industry benchmarks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">
          Compare organizational performance against industry standards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={benchmarkType} onValueChange={setBenchmarkType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select benchmark type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(benchmarkData).map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 5, left: 0, bottom: 20 }}
              barGap={8}
              barCategoryGap={16}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <RechartTooltip
                formatter={(value, name) => {
                  return [value, name === "company" ? "Your Company" : "Industry Average"];
                }}
              />
              <ReferenceLine y={0} stroke="#666" />
              <Bar dataKey="company" name="Your Company" fill="#8884d8" />
              <Bar dataKey="industry" name="Industry Average" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparativeBenchmarks;
