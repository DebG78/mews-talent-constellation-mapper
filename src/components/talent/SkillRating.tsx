
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export const SkillRating = ({ value, onChange }: SkillRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const handleRatingClick = (rating: number) => {
    onChange(rating);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
            "transition-colors"
          )}
          onMouseEnter={() => setHoveredRating(rating)}
          onMouseLeave={() => setHoveredRating(null)}
          onClick={() => handleRatingClick(rating)}
        >
          <Star 
            className={cn(
              "h-6 w-6",
              (hoveredRating !== null ? rating <= hoveredRating : rating <= value)
                ? "fill-yellow-500 text-yellow-500" 
                : "text-gray-300"
            )} 
          />
        </button>
      ))}
      <span className="ml-2 text-sm">{value > 0 ? `${value}/5` : 'Not rated'}</span>
    </div>
  );
};
