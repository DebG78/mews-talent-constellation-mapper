
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

interface PerformanceRatingProps {
  rating: number;
}

const PerformanceRating = ({ rating }: PerformanceRatingProps) => {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium flex items-center">
          <BarChart size={14} className="mr-1" />
          Performance Rating
        </span>
        <span className="text-sm font-semibold">{rating}/5</span>
      </div>
      <Progress value={rating * 20} className="h-2" />
    </div>
  );
};

export default PerformanceRating;
