
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, ChevronDown, BookOpen } from "lucide-react";
import { DevelopmentOption, Employee } from "@/types/employee";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AddDevelopmentOptionForm from "./AddDevelopmentOptionForm";
import DevelopmentOptionsList from "./DevelopmentOptionsList";

interface DevelopmentOptionsProps {
  employee: Employee;
  onUpdate: (updatedEmployee: Employee) => void;
}

const DevelopmentOptions = ({ employee, onUpdate }: DevelopmentOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const developmentOptions = employee.developmentOptions || [];
  
  const handleAddOption = (data: DevelopmentOption) => {
    try {
      const newOption: DevelopmentOption = {
        ...data,
        id: crypto.randomUUID()
      };
      
      const updatedOptions = [...developmentOptions, newOption];
      const updatedEmployee = {
        ...employee,
        developmentOptions: updatedOptions
      };
      
      onUpdate(updatedEmployee);
      setIsAddingNew(false);
      
      toast({
        title: "Development option added",
        description: `${newOption.title} has been added to ${employee.name}'s development plan.`,
      });
    } catch (err) {
      console.error("Error adding development option:", err);
      toast({
        title: "Error adding option",
        description: "There was a problem adding the development option.",
        variant: "destructive"
      });
    }
  };
  
  const handleEditOption = (option: DevelopmentOption) => {
    setEditingId(option.id);
  };
  
  const handleSaveEdit = (data: DevelopmentOption) => {
    try {
      const updatedOptions = developmentOptions.map(opt => 
        opt.id === editingId ? { ...data, id: editingId } : opt
      );
      
      const updatedEmployee = {
        ...employee,
        developmentOptions: updatedOptions
      };
      
      onUpdate(updatedEmployee);
      setEditingId(null);
      
      toast({
        title: "Development option updated",
        description: `${data.title} has been updated.`,
      });
    } catch (err) {
      console.error("Error updating development option:", err);
      toast({
        title: "Error updating option",
        description: "There was a problem updating the development option.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteOption = (id: string) => {
    try {
      const updatedOptions = developmentOptions.filter(opt => opt.id !== id);
      const updatedEmployee = {
        ...employee,
        developmentOptions: updatedOptions
      };
      
      onUpdate(updatedEmployee);
      
      toast({
        title: "Development option removed",
        description: `The development option has been removed.`,
      });
    } catch (err) {
      console.error("Error deleting development option:", err);
      toast({
        title: "Error removing option",
        description: "There was a problem removing the development option.",
        variant: "destructive"
      });
    }
  };
  
  const handleAddButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingNew(true);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="pt-2 space-y-2">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md p-2">
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Development Options</h4>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
            </div>
          </CollapsibleTrigger>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddButtonClick}
            disabled={isAddingNew}
            className="h-7 px-2"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>

        <CollapsibleContent className="mt-2 space-y-3">
          {isAddingNew && (
            <AddDevelopmentOptionForm 
              onAdd={handleAddOption}
              onCancel={() => setIsAddingNew(false)}
            />
          )}
          
          {!isAddingNew && (
            <DevelopmentOptionsList
              options={developmentOptions}
              editingId={editingId}
              onEdit={handleEditOption}
              onSave={handleSaveEdit}
              onDelete={handleDeleteOption}
            />
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DevelopmentOptions;
