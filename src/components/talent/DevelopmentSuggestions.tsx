
import { Zone } from "@/types/employee";

interface DevelopmentSuggestionsProps {
  zone: Zone;
}

const DevelopmentSuggestions = ({ zone }: DevelopmentSuggestionsProps) => {
  return (
    <div className="pt-2 space-y-2">
      <h4 className="text-sm font-medium">Development Suggestions</h4>
      {zone === 'Acceleration' && (
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li>Leadership mentoring program</li>
          <li>Cross-functional project leadership</li>
          <li>Executive shadowing opportunity</li>
        </ul>
      )}
      
      {zone === 'Growth' && (
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li>Stretch assignments in current role</li>
          <li>Targeted skill development workshops</li>
          <li>Peer learning groups</li>
        </ul>
      )}
      
      {zone === 'Support' && (
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li>Performance improvement plan</li>
          <li>Core skills training</li>
          <li>Regular coaching sessions</li>
        </ul>
      )}
    </div>
  );
};

export default DevelopmentSuggestions;
