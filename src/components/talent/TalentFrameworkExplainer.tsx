
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
                  Our framework helps identify, develop, and retain top talent by assessing skill enablers
                  and performance ratings to map employees across zones and readiness levels.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="enablers">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enablers">Skill Enablers</TabsTrigger>
            <TabsTrigger value="performance">Performance Ratings</TabsTrigger>
            <TabsTrigger value="zones">Talent Zones</TabsTrigger>
            <TabsTrigger value="readiness">Readiness Levels</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enablers" className="space-y-4 pt-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Skill enablers are fundamental capabilities that drive talent growth and success. 
                Combined with performance ratings, they determine an employee's talent zone placement.
              </p>
              
              <div className="grid gap-4 grid-cols-2">
                <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                  <h3 className="text-sm font-semibold text-blue-700">Learning Agility</h3>
                  <p className="text-xs mt-1">
                    How quickly someone can grasp new concepts and put them into practice. People with high learning 
                    agility don't just absorb information, they actively seek new challenges and turn learning into results.
                  </p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-500">
                  <h3 className="text-sm font-semibold text-green-700">Drive & Ambition</h3>
                  <p className="text-xs mt-1">
                    People with high drive have a clear vision of what they want to achieve and align it with company goals. 
                    They take ownership of their growth and actively pursue bigger challenges.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-500">
                  <h3 className="text-sm font-semibold text-amber-700">Adaptability & Resilience</h3>
                  <p className="text-xs mt-1">
                    The ability to maintain effectiveness during change and pressure, seeing obstacles as 
                    opportunities, and helping others navigate uncertainty.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-md border-l-4 border-purple-500">
                  <h3 className="text-sm font-semibold text-purple-700">Innovation & Initiative</h3>
                  <p className="text-xs mt-1">
                    The ability to spot opportunities for improvement, challenge the status quo, and take 
                    action to make things better without being asked.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold">How Skill Enablers Affect Talent Zones</h3>
                <p className="text-xs mt-1">
                  Skill enablers account for 30% of an employee's talent zone placement, while performance ratings 
                  account for 70%. Together, they provide a comprehensive view of an employee's capabilities and potential.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4 pt-4">
            <div className="grid gap-4 grid-cols-1">
              <div className="bg-purple-50 p-3 rounded-md border-l-4 border-purple-600">
                <h3 className="text-sm font-semibold text-purple-600">5 - Sets a New Standard</h3>
                <p className="text-xs mt-1">
                  Reserved for those who consistently redefine excellence and drive significant impact. 
                  Operates at a significantly higher level, delivers extraordinary results, and inspires others 
                  through their work and leadership.
                </p>
                <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
                  <li>Consistently delivers industry-leading work</li>
                  <li>Has added significant business value to the organization</li>
                  <li>Sought after by executives for strategic insights</li>
                  <li>Elevates the entire team/organization</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-600">
                <h3 className="text-sm font-semibold text-blue-600">4 - Often Exceeds Expectations</h3>
                <p className="text-xs mt-1">
                  High performers consistently going above and beyond. Consistently performs at a higher level, 
                  delivers exceptional results, and is recognized both inside and outside their team.
                </p>
                <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
                  <li>Exceeds goals by a significant margin (30%+)</li>
                  <li>Takes on additional responsibilities beyond their role</li>
                  <li>Proactively improves processes and mentors others</li>
                  <li>Consistently goes the extra mile</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-600">
                <h3 className="text-sm font-semibold text-green-600">3 - Consistently Meets Expectations</h3>
                <p className="text-xs mt-1">
                  This is where the majority of employees should be. Consistently meets and sometimes exceeds 
                  expectations, delivers high-quality work, and demonstrates company values.
                </p>
                <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
                  <li>Delivers expected results with good quality and reliability</li>
                  <li>Collaborates effectively and communicates clearly</li>
                  <li>Aligned with company's standards</li>
                  <li>Occasionally goes beyond expectations</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-600">
                <h3 className="text-sm font-semibold text-amber-600">1-2 - Needs Development</h3>
                <p className="text-xs mt-1">
                  Performance is inconsistent and often falls short of expected standards. May sometimes 
                  meet goals but struggles to do so consistently.
                </p>
                <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
                  <li>Frequently misses deadlines or delivers work requiring significant rework</li>
                  <li>Performance metrics not consistently met</li>
                  <li>Struggles with effective collaboration</li>
                  <li>Needs frequent guidance and intervention</li>
                </ul>
                <p className="text-xs mt-2 italic">
                  May apply to employees who are new to the role or still developing required skills.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="zones" className="space-y-4 pt-4">
            <div className="grid gap-4 grid-cols-1">
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold">How Talent Zones Are Determined</h3>
                <p className="text-xs mt-1">
                  Each employee's placement in a talent zone is based on a weighted formula:
                  <br /><br />
                  <span className="font-medium">Zone Score = (Performance Rating × 70%) + (Skill Enablers Average × 30%)</span>
                  <br /><br />
                  • Score ≥ 4.0: Acceleration Zone<br />
                  • Score 2.5-3.9: Growth Zone<br />
                  • Score < 2.5: Support Zone
                </p>
              </div>
            
              <div className="bg-blue-50 p-3 rounded-md border-l-4 border-acceleration">
                <h3 className="text-sm font-semibold text-acceleration">Acceleration Zone</h3>
                <p className="text-xs mt-1">
                  High-performing employees with strong potential. Priority for development
                  opportunities and advancement.
                </p>
                <p className="text-xs mt-1">
                  <span className="font-medium">Typical characteristics:</span> High performance ratings (4-5) combined with strong skill enablers,
                  particularly in learning agility and drive.
                </p>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border-l-4 border-development">
                <h3 className="text-sm font-semibold text-development">Growth Zone</h3>
                <p className="text-xs mt-1">
                  Solid performers who benefit from targeted development to enhance specific
                  skills or competencies.
                </p>
                <p className="text-xs mt-1">
                  <span className="font-medium">Typical characteristics:</span> Moderate to good performance ratings (3-4) with varying skill enabler
                  scores that may need development in specific areas.
                </p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md border-l-4 border-support">
                <h3 className="text-sm font-semibold text-support">Support Zone</h3>
                <p className="text-xs mt-1">
                  Employees who need significant improvement or may be better suited for
                  different roles within the organization.
                </p>
                <p className="text-xs mt-1">
                  <span className="font-medium">Typical characteristics:</span> Lower performance ratings (1-2) often combined with skill enabler
                  gaps in critical areas.
                </p>
              </div>
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
                Zones (Acceleration, Growth, Support) indicate performance and potential, 
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
