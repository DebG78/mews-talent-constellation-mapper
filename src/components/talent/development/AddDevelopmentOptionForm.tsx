
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DevelopmentOption } from "@/types/employee";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface AddDevelopmentOptionFormProps {
  onAdd: (data: DevelopmentOption) => void;
  onCancel: () => void;
}

// Define validation schema using zod
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["Planned", "In Progress", "Completed"]),
  dueDate: z.string().optional(),
});

// Type for the form data
type FormValues = z.infer<typeof formSchema>;

const AddDevelopmentOptionForm = ({ onAdd, onCancel }: AddDevelopmentOptionFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'Planned',
      dueDate: '',
    }
  });
  
  const handleSubmit = (values: FormValues) => {
    const developmentOption: DevelopmentOption = {
      id: '',
      ...values
    };
    onAdd(developmentOption);
    form.reset();
  };
  
  return (
    <div className="border rounded-md p-2 bg-muted/20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs">Title</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    className="h-8 text-sm" 
                    placeholder="Mentoring program..."
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    className="min-h-[60px] text-sm" 
                    placeholder="Details about the development option..."
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
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
              control={form.control}
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCancel();
              }}
              className="h-8"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="sm" 
              className="h-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddDevelopmentOptionForm;
