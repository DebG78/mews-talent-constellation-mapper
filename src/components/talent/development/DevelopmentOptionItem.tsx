
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, X, CalendarDays, Clock, Check, Save } from "lucide-react";
import { DevelopmentOption } from "@/types/employee";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface DevelopmentOptionItemProps {
  option: DevelopmentOption;
  editingId: string | null;
  onEdit: (option: DevelopmentOption) => void;
  onSave: (data: DevelopmentOption) => void;
  onDelete: (id: string) => void;
}

// Define validation schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["Planned", "In Progress", "Completed"]),
  dueDate: z.string().optional(),
});

// Type for the form data
type FormValues = z.infer<typeof formSchema>;

const DevelopmentOptionItem = ({ 
  option, 
  editingId, 
  onEdit, 
  onSave, 
  onDelete 
}: DevelopmentOptionItemProps) => {
  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: option.title,
      description: option.description,
      status: option.status,
      dueDate: option.dueDate || '',
    }
  });
  
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
  const handleSubmit = (data: FormValues) => {
    onSave({
      ...data,
      id: option.id
    });
  };

  // Initialize the form when entering edit mode
  useEffect(() => {
    if (editingId === option.id) {
      editForm.reset({
        title: option.title,
        description: option.description,
        status: option.status,
        dueDate: option.dueDate || '',
      });
    }
  }, [editingId, option, editForm.reset]);

  return (
    <div className="border rounded-md p-2">
      {editingId === option.id ? (
        <Form {...editForm}>
          <form onSubmit={editForm.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={editForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs">Title</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      className="h-8 text-sm" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={editForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      className="min-h-[60px] text-sm" 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Status</FormLabel>
                    <FormControl>
                      <select 
                        {...field}
                        className="h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs">Due Date (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="h-8 text-sm" 
                        type="date"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
        </Form>
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
