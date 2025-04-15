
import MomentumGauge from "../momentum/MomentumGauge";
import MomentumScoreExplainer from "../momentum/MomentumScoreExplainer";
import { MomentumScore } from "@/types/employee";

interface MomentumScoreSectionProps {
  momentumScore: MomentumScore;
  className?: string;
}

const MomentumScoreSection = ({ momentumScore, className }: MomentumScoreSectionProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-sm font-medium mb-2">Momentum Score</h3>
      <MomentumGauge momentumScore={momentumScore} />
      <MomentumScoreExplainer className="mt-2" />
    </div>
  );
};

export default MomentumScoreSection;
