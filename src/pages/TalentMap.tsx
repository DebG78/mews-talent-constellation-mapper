
import MainLayout from "@/components/layout/MainLayout";
import TalentMapHeader from "@/components/talent/map/TalentMapHeader";
import TalentMapContent from "@/components/talent/map/TalentMapContent";
import { TalentMapProvider } from "@/providers/TalentMapProvider";

const TalentMap = () => {
  return (
    <MainLayout>
      <TalentMapProvider>
        <div className="space-y-6 animate-fade-in">
          <TalentMapHeader />
          <TalentMapContent />
        </div>
      </TalentMapProvider>
    </MainLayout>
  );
};

export default TalentMap;
