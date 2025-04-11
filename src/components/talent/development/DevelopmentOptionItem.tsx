
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, X, CalendarDays, Clock, Check } from "lucide-react";
import { DevelopmentOption } from "@/types/employee";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

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
  const editForm = useForm<DevelopmentOption>();
  
  // Get status badge
  const getStatusBadge = (status: string) => {
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

  // Handle form submission
  const handleSubmit = (data: DevelopmentOption) => {
    onSave(data);
  };

  // Initialize the form when entering edit mode
  React.useEffect(() => {
    if (editingId === option.id) {
      editForm.reset(option);
    }
  }, [editingId, option, editForm]);

  return (
    <div className="border rounded-md p-2">
      {editingId === option.id ? (
        <form onSubmit={editForm.handleSubmit(handleSubmit)} className="space-y-2">
          <FormItem className="space-y-1">
            <FormLabel className="text-xs">Title</FormLabel>
            <Input 
              {...editForm.register('title')}
              className="h-8 text-sm" 
            />
          </FormItem>
          
          <FormItem className="space-y-1">
            <FormLabel className="text-xs">Description</FormLabel>
            <Textarea 
              {...editForm.register('description')}
              className="min-h-[60px] text-sm" 
            />
          </FormItem>
          
          <div className="grid grid-cols-2 gap-2">
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Status</FormLabel>
              <select 
                {...editForm.register('status')}
                className="h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </FormItem>
            
            <FormItem className="space-y-1">
              <FormLabel className="text-xs">Due Date (Optional)</FormLabel>
              <Input 
                {...editForm.register('dueDate')}
                className="h-8 text-sm" 
                type="date"
              />
            </FormItem>
          </div>
          
          <div className="flex justify-end gap-2 pt-1">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(null as any)}
              className="h-8"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="h-8">
              <Save className="h-3.5 w-3.5 mr-1" />
              Save
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start mb-1">
            <div className="font-medium text-sm">{option.title}</div>
            <div className="flex items-center space-x-1">
              {getStatusBadge(option.status)}
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
      )}
    </div>
  );
};

export default DevelopmentOptionItem;
