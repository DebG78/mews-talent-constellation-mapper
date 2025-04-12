
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PerformanceRatingProps {
  rating: number;
}

const PerformanceRating = ({ rating }: PerformanceRatingProps) => {
  // Function to determine color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 5) return "bg-purple-600";
    if (rating >= 4) return "bg-blue-600";
    if (rating >= 3) return "bg-green-600";
    return "bg-amber-600";
  };

  // Function to get the rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 5) return "Sets a New Standard";
    if (rating >= 4) return "Often Exceeds Expectations";
    if (rating >= 3) return "Consistently Meets Expectations";
    return "Needs Development";
  };

  // Function to get the rating description
  const getRatingDescription = (rating: number) => {
    if (rating >= 5) {
      return "Consistently delivers industry-leading work, adds significant business value, and elevates others. Reserved for extraordinary few who set new benchmarks.";
    }
    if (rating >= 4) {
      return "High performer who exceeds goals by 30%+, takes on additional responsibilities, proactively improves processes, and consistently goes the extra mile.";
    }
    if (rating >= 3) {
      return "Delivers expected results with good quality, collaborates effectively, and aligns with company standards. This is where most employees should be.";
    }
    return "Performance is inconsistent, may struggle with meeting standards consistently, needs frequent guidance. May apply to employees new to role.";
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium flex items-center">
          <BarChart size={14} className="mr-1" />
          Performance Rating
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-semibold cursor-help">
                {rating}/5 - {getRatingLabel(rating)}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-sm font-medium">{getRatingLabel(rating)}</p>
              <p className="text-xs mt-1">{getRatingDescription(rating)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Progress 
        value={rating * 20} 
        className="h-2"
        indicatorClassName={cn(getRatingColor(rating))}
      />
    </div>
  );
};

export default PerformanceRating;
