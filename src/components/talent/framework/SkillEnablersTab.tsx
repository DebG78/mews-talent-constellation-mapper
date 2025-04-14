
import React from "react";

const SkillEnablersTab = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Skill enablers are fundamental capabilities that drive talent growth and success. 
        Combined with performance ratings, they determine an employee's talent zone placement.
      </p>
      
      <div className="grid gap-4 grid-cols-2">
        <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
          <h3 className="text-sm font-semibold text-blue-700">Learning Agility</h3>
          <p className="text-xs mt-1">
            How quickly someone can grasp new concepts and put them into practice. People with high learning 
            agility don't just absorb information, they actively seek new challenges and turn learning into results.
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-md border-l-4 border-green-500">
          <h3 className="text-sm font-semibold text-green-700">Drive & Ambition</h3>
          <p className="text-xs mt-1">
            People with high drive have a clear vision of what they want to achieve and align it with company goals. 
            They take ownership of their growth and actively pursue bigger challenges.
          </p>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-md border-l-4 border-amber-500">
          <h3 className="text-sm font-semibold text-amber-700">Adaptability & Resilience</h3>
          <p className="text-xs mt-1">
            The ability to maintain effectiveness during change and pressure, seeing obstacles as 
            opportunities, and helping others navigate uncertainty.
          </p>
        </div>
        
        <div className="bg-purple-50 p-3 rounded-md border-l-4 border-purple-500">
          <h3 className="text-sm font-semibold text-purple-700">Innovation & Initiative</h3>
          <p className="text-xs mt-1">
            The ability to spot opportunities for improvement, challenge the status quo, and take 
            action to make things better without being asked.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md">
        <h3 className="text-sm font-semibold">How Skill Enablers Affect Talent Zones</h3>
        <p className="text-xs mt-1">
          Skill enablers account for 30% of an employee's talent zone placement, while performance ratings 
          account for 70%. Together, they provide a comprehensive view of an employee's capabilities and potential.
        </p>
      </div>
    </div>
  );
};

export default SkillEnablersTab;
