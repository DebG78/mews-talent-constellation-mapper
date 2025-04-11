
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DevelopmentOption } from "@/types/employee";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface AddDevelopmentOptionFormProps {
  onAdd: (data: DevelopmentOption) => void;
  onCancel: () => void;
}

const AddDevelopmentOptionForm = ({ onAdd, onCancel }: AddDevelopmentOptionFormProps) => {
  const form = useForm<DevelopmentOption>({
    defaultValues: {
      id: '',
      title: '',
      description: '',
      status: 'Planned',
      dueDate: undefined
    }
  });
  
  const handleSubmit = (data: DevelopmentOption) => {
    onAdd(data);
    form.reset();
  };
  
  return (
    <div className="border rounded-md p-2 bg-muted/20">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormItem className="space-y-1">
          <FormLabel className="text-xs">Title</FormLabel>
          <Input 
            {...form.register('title', { required: true })}
            className="h-8 text-sm" 
            placeholder="Mentoring program..."
          />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">Title is required</p>
          )}
        </FormItem>
        
        <FormItem className="space-y-1">
          <FormLabel className="text-xs">Description</FormLabel>
          <Textarea 
            {...form.register('description', { required: true })}
            className="min-h-[60px] text-sm" 
            placeholder="Details about the development option..."
          />
          {form.formState.errors.description && (
            <p className="text-xs text-destructive">Description is required</p>
          )}
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
    </div>
  );
};

export default AddDevelopmentOptionForm;
