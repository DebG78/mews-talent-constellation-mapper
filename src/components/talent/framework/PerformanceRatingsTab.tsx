
import React from "react";

const PerformanceRatingsTab = () => {
  return (
    <div className="grid gap-4 grid-cols-1">
      <div className="bg-purple-50 p-3 rounded-md border-l-4 border-purple-600">
        <h3 className="text-sm font-semibold text-purple-600">5 - Sets a New Standard</h3>
        <p className="text-xs mt-1">
          Reserved for those who consistently redefine excellence and drive significant impact. 
          Operates at a significantly higher level, delivers extraordinary results, and inspires others 
          through their work and leadership.
        </p>
        <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
          <li>Consistently delivers industry-leading work</li>
          <li>Has added significant business value to the organization</li>
          <li>Sought after by executives for strategic insights</li>
          <li>Elevates the entire team/organization</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-600">
        <h3 className="text-sm font-semibold text-blue-600">4 - Often Exceeds Expectations</h3>
        <p className="text-xs mt-1">
          High performers consistently going above and beyond. Consistently performs at a higher level, 
          delivers exceptional results, and is recognized both inside and outside their team.
        </p>
        <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
          <li>Exceeds goals by a significant margin (30%+)</li>
          <li>Takes on additional responsibilities beyond their role</li>
          <li>Proactively improves processes and mentors others</li>
          <li>Consistently goes the extra mile</li>
        </ul>
      </div>
      
      <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-600">
        <h3 className="text-sm font-semibold text-green-600">3 - Consistently Meets Expectations</h3>
        <p className="text-xs mt-1">
          This is where the majority of employees should be. Consistently meets and sometimes exceeds 
          expectations, delivers high-quality work, and demonstrates company values.
        </p>
        <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
          <li>Delivers expected results with good quality and reliability</li>
          <li>Collaborates effectively and communicates clearly</li>
          <li>Aligned with company's standards</li>
          <li>Occasionally goes beyond expectations</li>
        </ul>
      </div>
      
      <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-600">
        <h3 className="text-sm font-semibold text-amber-600">1-2 - Needs Development</h3>
        <p className="text-xs mt-1">
          Performance is inconsistent and often falls short of expected standards. May sometimes 
          meet goals but struggles to do so consistently.
        </p>
        <ul className="text-xs list-disc pl-5 mt-2 space-y-1">
          <li>Frequently misses deadlines or delivers work requiring significant rework</li>
          <li>Performance metrics not consistently met</li>
          <li>Struggles with effective collaboration</li>
          <li>Needs frequent guidance and intervention</li>
        </ul>
        <p className="text-xs mt-2 italic">
          May apply to employees who are new to the role or still developing required skills.
        </p>
      </div>
    </div>
  );
};

export default PerformanceRatingsTab;
