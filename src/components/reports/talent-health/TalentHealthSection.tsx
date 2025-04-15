
import TalentFlowSankey from "./TalentFlowSankey";
import PromotionPipeline from "./PromotionPipeline";
import DiversityDistribution from "./DiversityDistribution";
import AttritionRiskMap from "./AttritionRiskMap";
import PredictiveModeling from "./PredictiveModeling";
import ComparativeBenchmarks from "./ComparativeBenchmarks";
import HistoricalTrends from "./HistoricalTrends";

const TalentHealthSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Organizational Talent Health</h2>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis of talent flow, forecasting, diversity, and risk
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TalentFlowSankey />
        <PromotionPipeline />
        <DiversityDistribution />
        <AttritionRiskMap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PredictiveModeling />
        <ComparativeBenchmarks />
        <HistoricalTrends />
      </div>
    </div>
  );
};

export default TalentHealthSection;
