
import { DevelopmentOption } from "@/types/employee";
import DevelopmentOptionItem from "./DevelopmentOptionItem";

interface DevelopmentOptionsListProps {
  options: DevelopmentOption[];
  editingId: string | null;
  onEdit: (option: DevelopmentOption) => void;
  onSave: (data: DevelopmentOption) => void;
  onDelete: (id: string) => void;
}

const DevelopmentOptionsList = ({
  options,
  editingId,
  onEdit,
  onSave,
  onDelete
}: DevelopmentOptionsListProps) => {
  if (options.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2">
        No development options recorded yet.
      </div>
    );
  }
  
  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
      {options.map((option) => (
        <DevelopmentOptionItem
          key={option.id}
          option={option}
          editingId={editingId}
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default DevelopmentOptionsList;
