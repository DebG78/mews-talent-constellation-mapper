
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X } from "lucide-react";
import { DevelopmentOption } from "@/types/employee";
import StatusBadge from "./StatusBadge";
import EditDevelopmentOptionForm from "./EditDevelopmentOptionForm";
import ViewDevelopmentOptionDetails from "./ViewDevelopmentOptionDetails";

interface DevelopmentOptionItemProps {
  option: DevelopmentOption;
  editingId: string | null;
  onEdit: (option: DevelopmentOption) => void;
  onSave: (data: DevelopmentOption) => void;
  onDelete: (id: string) => void;
}

const DevelopmentOptionItem = ({ 
  option, 
  editingId, 
  onEdit, 
  onSave, 
  onDelete 
}: DevelopmentOptionItemProps) => {
  const isEditing = editingId === option.id;
  
  // Handle cancel editing
  const handleCancelEdit = () => {
    onEdit(null as any);
  };

  return (
    <div className="border rounded-md p-2">
      {isEditing ? (
        <EditDevelopmentOptionForm 
          option={option}
          onSave={onSave}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <ViewDevelopmentOptionDetails option={option} />
            <div className="flex items-center space-x-1 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => onEdit(option)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-destructive"
                onClick={() => onDelete(option.id)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentOptionItem;
