
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";

const TalentFrameworkExplainer = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium flex items-center gap-2">
          Understanding Our Talent Framework
          <HoverCard>
            <HoverCardTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Talent Acceleration Framework</h4>
                <p className="text-xs text-muted-foreground">
                  Our framework helps identify, develop, and retain top talent by mapping
                  employees across zones and readiness levels.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="zones">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="zones">Talent Zones</TabsTrigger>
            <TabsTrigger value="readiness">Readiness Levels</TabsTrigger>
          </TabsList>
          <TabsContent value="zones" className="space-y-4 pt-4">
            <div className="grid gap-4 grid-cols-3">
              <div className="bg-blue-50 p-3 rounded-md border-l-4 border-acceleration">
                <h3 className="text-sm font-semibold text-acceleration">Acceleration Zone</h3>
                <p className="text-xs mt-1">
                  High-performing employees with strong potential. Priority for development
                  opportunities and advancement.
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-md border-l-4 border-development">
                <h3 className="text-sm font-semibold text-development">Development Zone</h3>
                <p className="text-xs mt-1">
                  Solid performers who benefit from targeted development to enhance specific
                  skills or competencies.
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-md border-l-4 border-support">
                <h3 className="text-sm font-semibold text-support">Support Zone</h3>
                <p className="text-xs mt-1">
                  Employees who need significant improvement or may be better suited for
                  different roles within the organization.
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Important Note:</p>
              <p>
                An employee can be in any zone regardless of their readiness level. For example, 
                someone in the Acceleration Zone might still be "Not Ready" for promotion if they 
                need more experience in their current role.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="readiness" className="space-y-4 pt-4">
            <div className="grid gap-4 grid-cols-3">
              <div className="bg-green-50 p-3 rounded-md border-l-4 border-ready-now">
                <h3 className="text-sm font-semibold text-ready-now">Ready Now</h3>
                <p className="text-xs mt-1">
                  Immediately ready for promotion or advancement. Has all necessary skills and 
                  experience for the next level.
                </p>
              </div>
              <div className="bg-amber-50 p-3 rounded-md border-l-4 border-ready-soon">
                <h3 className="text-sm font-semibold text-ready-soon">Ready Soon</h3>
                <p className="text-xs mt-1">
                  Will be ready for advancement after some targeted development. Typically 
                  6-12 months away from readiness.
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md border-l-4 border-not-ready">
                <h3 className="text-sm font-semibold text-not-ready">Not Ready</h3>
                <p className="text-xs mt-1">
                  Requires significant development before being considered for advancement. 
                  Focus on mastering current role.
                </p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">The Zone-Readiness Relationship:</p>
              <p>
                Zones (Acceleration, Development, Support) indicate performance and potential, 
                while Readiness (Ready Now, Ready Soon, Not Ready) indicates promotion 
                timeline. These are separate but related concepts - high performers may still 
                need time before promotion.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TalentFrameworkExplainer;
