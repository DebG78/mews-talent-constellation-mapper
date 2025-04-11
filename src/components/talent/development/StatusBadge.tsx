
import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'Planned':
      return <Badge className="bg-blue-500 hover:bg-blue-600">Planned</Badge>;
    case 'In Progress':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>;
    case 'Completed':
      return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default StatusBadge;
