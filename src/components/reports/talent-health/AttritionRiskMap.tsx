
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const mockDepartmentRisks = {
  Engineering: [
    { team: "Backend", risk: "high", count: 4 },
    { team: "Frontend", risk: "medium", count: 3 },
    { team: "DevOps", risk: "low", count: 1 },
    { team: "QA", risk: "medium", count: 2 },
  ],
  Marketing: [
    { team: "Digital", risk: "medium", count: 2 },
    { team: "Content", risk: "low", count: 1 },
    { team: "Brand", risk: "high", count: 3 },
  ],
  Sales: [
    { team: "Enterprise", risk: "low", count: 1 },
    { team: "SMB", risk: "high", count: 4 },
    { team: "Channel", risk: "medium", count: 2 },
  ],
  Product: [
    { team: "Design", risk: "medium", count: 2 },
    { team: "Management", risk: "low", count: 1 },
    { team: "Research", risk: "medium", count: 2 },
  ],
  "Customer Support": [
    { team: "Tier 1", risk: "high", count: 3 },
    { team: "Tier 2", risk: "medium", count: 2 },
    { team: "Technical", risk: "low", count: 1 },
  ],
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "high":
      return "bg-red-500/20 border-red-500";
    case "medium":
      return "bg-amber-500/20 border-amber-500";
    case "low":
      return "bg-green-500/20 border-green-500";
    default:
      return "bg-gray-500/20 border-gray-500";
  }
};

const AttritionRiskMap = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("Engineering");
  const departmentData = mockDepartmentRisks[selectedDepartment as keyof typeof mockDepartmentRisks] || [];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Attrition Risk Heat Map</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ShieldOff className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Visualization of potential talent loss by team/function</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-xs">Potential talent loss by department and team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(mockDepartmentRisks).map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {departmentData.map((item) => (
            <div 
              key={item.team} 
              className={`border rounded-md p-3 ${getRiskColor(item.risk)}`}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm">{item.team}</div>
                <div className="text-xs flex items-center gap-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${item.risk === "high" ? "bg-red-500" : item.risk === "medium" ? "bg-amber-500" : "bg-green-500"}`}></span>
                  {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)} Risk
                </div>
              </div>
              <div className="text-xs mt-1">{item.count} employees at risk</div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-4 space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-red-500/20 border border-red-500 rounded-sm mr-1"></span>
            High Risk
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-amber-500/20 border border-amber-500 rounded-sm mr-1"></span>
            Medium Risk
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-green-500/20 border border-green-500 rounded-sm mr-1"></span>
            Low Risk
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttritionRiskMap;
