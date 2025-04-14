
import React from "react";

const ReadinessLevelsTab = () => {
  return (
    <>
      <div className="grid gap-4 grid-cols-3">
        <div className="bg-green-50 p-3 rounded-md border-l-4 border-ready-now">
          <h3 className="text-sm font-semibold text-ready-now">Ready Now</h3>
          <p className="text-xs mt-1">
            Immediately ready for promotion or advancement. Has all necessary skills and 
            experience for the next level.
          </p>
        </div>
        <div className="bg-amber-50 p-3 rounded-md border-l-4 border-ready-soon">
          <h3 className="text-sm font-semibold text-ready-soon">Ready Soon</h3>
          <p className="text-xs mt-1">
            Will be ready for advancement after some targeted development. Typically 
            6-12 months away from readiness.
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-md border-l-4 border-not-ready">
          <h3 className="text-sm font-semibold text-not-ready">Not Ready</h3>
          <p className="text-xs mt-1">
            Requires significant development before being considered for advancement. 
            Focus on mastering current role.
          </p>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-4">
        <p className="font-medium">The Zone-Readiness Relationship:</p>
        <p>
          Zones (Acceleration, Growth, Support) indicate performance and potential, 
          while Readiness (Ready Now, Ready Soon, Not Ready) indicates promotion 
          timeline. These are separate but related concepts - high performers may still 
          need time before promotion.
        </p>
      </div>
    </>
  );
};

export default ReadinessLevelsTab;
