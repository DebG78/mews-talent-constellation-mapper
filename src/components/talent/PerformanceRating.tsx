
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceRatingProps {
  rating: number;
}

const PerformanceRating = ({ rating }: PerformanceRatingProps) => {
  // Function to determine color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-blue-500";
    if (rating >= 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium flex items-center">
          <BarChart size={14} className="mr-1" />
          Performance Rating
        </span>
        <span className="text-sm font-semibold">{rating}/5</span>
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
