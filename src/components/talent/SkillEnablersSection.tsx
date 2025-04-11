
import { Gauge } from "lucide-react";
import SkillEnablerBar from "./SkillEnablerBar";
import { SkillEnablers } from "@/types/employee";

interface SkillEnablersSectionProps {
  skillEnablers: SkillEnablers;
}

const SkillEnablersSection = ({ skillEnablers }: SkillEnablersSectionProps) => {
  return (
    <div className="space-y-4 pt-2">
      <h4 className="text-sm font-medium flex items-center">
        <Gauge size={14} className="mr-1" />
        Skill Enablers
      </h4>
      
      <div className="space-y-3">
        <SkillEnablerBar 
          label="Drive" 
          value={skillEnablers.drive} 
          color="bg-blue-500" 
        />
        <SkillEnablerBar 
          label="Learning Agility" 
          value={skillEnablers.learningAgility} 
          color="bg-green-500" 
        />
        <SkillEnablerBar 
          label="Innovation" 
          value={skillEnablers.innovation} 
          color="bg-purple-500" 
        />
        <SkillEnablerBar 
          label="Adaptability" 
          value={skillEnablers.adaptability} 
          color="bg-orange-500" 
        />
      </div>
    </div>
  );
};

export default SkillEnablersSection;
