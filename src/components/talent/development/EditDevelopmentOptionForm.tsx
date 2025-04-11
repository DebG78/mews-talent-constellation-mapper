
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevelopmentOption } from "@/types/employee";

interface EditDevelopmentOptionFormProps {
  option: DevelopmentOption;
  onSave: (data: DevelopmentOption) => void;
  onCancel: () => void;
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

const EditDevelopmentOptionForm = ({ option, onSave, onCancel }: EditDevelopmentOptionFormProps) => {
  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: option.title,
      description: option.description,
      status: option.status,
      dueDate: option.dueDate || '',
    }
  });
  
  const handleSubmit = (data: FormValues) => {
    // Create a valid DevelopmentOption object
    const updatedOption: DevelopmentOption = {
      id: option.id,
      title: data.title,
      description: data.description,
      status: data.status,
      // Only add dueDate if it's not an empty string
      ...(data.dueDate ? { dueDate: data.dueDate } : {})
    };
    
    onSave(updatedOption);
  };

  return (
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
            onClick={onCancel}
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
  );
};

export default EditDevelopmentOptionForm;
