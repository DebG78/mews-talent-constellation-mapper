
import React from "react";
import { CalendarDays, Clock, Check } from "lucide-react";
import { DevelopmentOption } from "@/types/employee";
import StatusBadge from "./StatusBadge";

interface ViewDevelopmentOptionDetailsProps {
  option: DevelopmentOption;
}

const ViewDevelopmentOptionDetails = ({ option }: ViewDevelopmentOptionDetailsProps) => {
  return (
    <>
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium text-sm">{option.title}</div>
        <StatusBadge status={option.status} />
      </div>
      
      <div className="text-xs text-muted-foreground">
        {option.description}
      </div>
      
      {option.dueDate && (
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <CalendarDays className="h-3 w-3 mr-1" />
          Due: {option.dueDate}
        </div>
      )}
      
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        {option.status === 'Planned' && <Clock className="h-3 w-3 mr-1" />}
        {option.status === 'In Progress' && <Clock className="h-3 w-3 mr-1" />}
        {option.status === 'Completed' && <Check className="h-3 w-3 mr-1" />}
        Status: {option.status}
      </div>
    </>
  );
};

export default ViewDevelopmentOptionDetails;
