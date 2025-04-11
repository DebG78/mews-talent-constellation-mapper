
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, ChevronDown, BookOpen, Check, Clock, CalendarDays, Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DevelopmentOption, Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

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
  
  const form = useForm<DevelopmentOption>({
    defaultValues: {
      id: '',
      title: '',
      description: '',
      status: 'Planned',
      dueDate: undefined
    }
  });
  
  const editForm = useForm<DevelopmentOption>();
  
  const handleAddOption = (data: DevelopmentOption) => {
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
    form.reset();
    
    toast({
      title: "Development option added",
      description: `${newOption.title} has been added to ${employee.name}'s development plan.`,
    });
  };
  
  const handleEditOption = (option: DevelopmentOption) => {
    setEditingId(option.id);
    editForm.reset(option);
  };
  
  const handleSaveEdit = (data: DevelopmentOption) => {
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
  };
  
  const handleDeleteOption = (id: string) => {
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
  };
  
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
            onClick={() => setIsAddingNew(true)}
            disabled={isAddingNew}
            className="h-7 px-2"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>

        <CollapsibleContent className="mt-2 space-y-3">
          {isAddingNew && (
            <div className="border rounded-md p-2 bg-muted/20">
              <form onSubmit={form.handleSubmit(handleAddOption)} className="space-y-2">
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs">Title</FormLabel>
                  <Input 
                    {...form.register('title')}
                    className="h-8 text-sm" 
                    placeholder="Mentoring program..."
                  />
                </FormItem>
                
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs">Description</FormLabel>
                  <Textarea 
                    {...form.register('description')}
                    className="min-h-[60px] text-sm" 
                    placeholder="Details about the development option..."
                  />
                </FormItem>
                
                <div className="grid grid-cols-2 gap-2">
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Status</FormLabel>
                    <select 
                      {...form.register('status')}
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
                      {...form.register('dueDate')}
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
                    onClick={() => setIsAddingNew(false)}
                    className="h-8"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="h-8">Save</Button>
                </div>
              </form>
            </div>
          )}
          
          {developmentOptions.length === 0 && !isAddingNew ? (
            <div className="text-sm text-muted-foreground text-center py-2">
              No development options recorded yet.
            </div>
          ) : (
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
              {developmentOptions.map((option) => (
                <div key={option.id} className="border rounded-md p-2">
                  {editingId === option.id ? (
                    <form onSubmit={editForm.handleSubmit(handleSaveEdit)} className="space-y-2">
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
                          onClick={() => setEditingId(null)}
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
                            onClick={() => handleEditOption(option)}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-destructive"
                            onClick={() => handleDeleteOption(option.id)}
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
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DevelopmentOptions;
