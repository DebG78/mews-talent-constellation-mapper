
import React from "react";

const TalentZonesTab = () => {
  return (
    <div className="grid gap-4 grid-cols-1">
      <div className="bg-gray-50 p-3 rounded-md">
        <h3 className="text-sm font-semibold">How Talent Zones Are Determined</h3>
        <p className="text-xs mt-1">
          Each employee's placement in a talent zone is based on a weighted formula:
          <br /><br />
          <span className="font-medium">Zone Score = (Performance Rating × 70%) + (Skill Enablers Average × 30%)</span>
          <br /><br />
          • Score ≥ 4.0: Acceleration Zone<br />
          • Score 2.5-3.9: Growth Zone<br />
          • Score &lt; 2.5: Support Zone
        </p>
      </div>
    
      <div className="bg-blue-50 p-3 rounded-md border-l-4 border-acceleration">
        <h3 className="text-sm font-semibold text-acceleration">Acceleration Zone</h3>
        <p className="text-xs mt-1">
          High-performing employees with strong potential. Priority for development
          opportunities and advancement.
        </p>
        <p className="text-xs mt-1">
          <span className="font-medium">Typical characteristics:</span> High performance ratings (4-5) combined with strong skill enablers,
          particularly in learning agility and drive.
        </p>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-md border-l-4 border-development">
        <h3 className="text-sm font-semibold text-development">Growth Zone</h3>
        <p className="text-xs mt-1">
          Solid performers who benefit from targeted development to enhance specific
          skills or competencies.
        </p>
        <p className="text-xs mt-1">
          <span className="font-medium">Typical characteristics:</span> Moderate to good performance ratings (3-4) with varying skill enabler
          scores that may need development in specific areas.
        </p>
      </div>
      
      <div className="bg-red-50 p-3 rounded-md border-l-4 border-support">
        <h3 className="text-sm font-semibold text-support">Support Zone</h3>
        <p className="text-xs mt-1">
          Employees who need significant improvement or may be better suited for
          different roles within the organization.
        </p>
        <p className="text-xs mt-1">
          <span className="font-medium">Typical characteristics:</span> Lower performance ratings (1-2) often combined with skill enabler
          gaps in critical areas.
        </p>
      </div>
    </div>
  );
};

export default TalentZonesTab;
