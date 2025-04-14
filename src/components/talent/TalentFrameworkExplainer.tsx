
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrameworkDescription from "./framework/FrameworkDescription";
import PerformanceRatingsTab from "./framework/PerformanceRatingsTab";
import SkillEnablersTab from "./framework/SkillEnablersTab";
import ReadinessLevelsTab from "./framework/ReadinessLevelsTab";
import TalentZonesTab from "./framework/TalentZonesTab";

const TalentFrameworkExplainer = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          <FrameworkDescription />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance Ratings</TabsTrigger>
            <TabsTrigger value="enablers">Skill Enablers</TabsTrigger>
            <TabsTrigger value="readiness">Readiness Levels</TabsTrigger>
            <TabsTrigger value="zones">Talent Zones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <PerformanceRatingsTab />
          </TabsContent>
          
          <TabsContent value="enablers" className="space-y-4 pt-4">
            <SkillEnablersTab />
          </TabsContent>
          
          <TabsContent value="readiness" className="space-y-4 pt-4">
            <ReadinessLevelsTab />
          </TabsContent>
          
          <TabsContent value="zones" className="space-y-4 pt-4">
            <TalentZonesTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TalentFrameworkExplainer;
