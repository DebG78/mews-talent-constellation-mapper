
import { cn } from "@/lib/utils";

interface SkillEnablerBarProps {
  label: string;
  value: number;
  color: string;
}

const SkillEnablerBar = ({ label, value, color }: SkillEnablerBarProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}/5</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${value * 20}%` }}
        />
      </div>
    </div>
  );
};

export default SkillEnablerBar;
