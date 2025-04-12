
import { useState } from "react";
import { Employee, SkillEnablers } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Flame, 
  LightbulbIcon, 
  BrainCircuit, 
  ArrowRightLeft, 
  Star 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SkillRating } from "./SkillRating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmployeeSkillFormProps {
  employee: Employee;
  onSubmit: (employeeId: string, skills: SkillEnablers) => void;
  onCancel: () => void;
}

// Define form validation schema
const formSchema = z.object({
  drive: z.number().min(1).max(5),
  learningAgility: z.number().min(1).max(5),
  innovation: z.number().min(1).max(5),
  adaptability: z.number().min(1).max(5),
});

const EmployeeSkillForm = ({ employee, onSubmit, onCancel }: EmployeeSkillFormProps) => {
  // Initialize form with current employee skill values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drive: employee.skillEnablers.drive || 0,
      learningAgility: employee.skillEnablers.learningAgility || 0,
      innovation: employee.skillEnablers.innovation || 0,
      adaptability: employee.skillEnablers.adaptability || 0,
    },
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(employee.id, values as SkillEnablers);
  };

  // Get employee initials for avatar
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to get the rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 5) return "Sets a New Standard";
    if (rating >= 4) return "Often Exceeds Expectations";
    if (rating >= 3) return "Consistently Meets Expectations";
    return "Needs Development";
  };

  // Function to get the rating description
  const getRatingDescription = (rating: number) => {
    if (rating >= 5) {
      return "Consistently delivers industry-leading work, adds significant business value, and elevates others.";
    }
    if (rating >= 4) {
      return "High performer who exceeds goals, takes on additional responsibilities, and goes the extra mile.";
    }
    if (rating >= 3) {
      return "Delivers expected results with good quality and collaborates effectively.";
    }
    return "Performance is inconsistent, may struggle with meeting standards consistently.";
  };

  // Function to determine color based on rating
  const getRatingColor = (rating: number) => {
    if (rating >= 5) return "bg-purple-600 text-white";
    if (rating >= 4) return "bg-blue-600 text-white";
    if (rating >= 3) return "bg-green-600 text-white";
    return "bg-amber-600 text-white";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="h-12 w-12 border-2 border-muted">
          <AvatarFallback className="bg-mews-navy text-white">
            {getInitials(employee.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{employee.name}</h3>
          <p className="text-sm text-muted-foreground">{employee.position}</p>
        </div>
      </div>
      
      <Separator />
      
      <div className="mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center mb-2 cursor-help">
                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="font-medium">
                  Performance Rating: {employee.performanceRating}/5
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({getRatingLabel(employee.performanceRating)})
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="space-y-2">
                <p className="text-sm font-medium">{getRatingLabel(employee.performanceRating)}</p>
                <p className="text-xs">{getRatingDescription(employee.performanceRating)}</p>
                <div className={`text-xs p-1.5 rounded ${getRatingColor(employee.performanceRating)}`}>
                  {employee.performanceRating}/5
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="w-full h-2 bg-gray-100 rounded-full">
          <div 
            className={`h-full rounded-full ${
              employee.performanceRating >= 5 ? "bg-purple-600" : 
              employee.performanceRating >= 4 ? "bg-blue-600" : 
              employee.performanceRating >= 3 ? "bg-green-600" : "bg-amber-600"
            }`}
            style={{ width: `${employee.performanceRating * 20}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="drive"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center mb-2">
                  <Flame className="h-4 w-4 text-red-500 mr-2" />
                  <FormLabel className="font-medium">Drive</FormLabel>
                </div>
                <FormDescription>
                  Assesses motivation, determination, and energy to achieve results.
                </FormDescription>
                <FormControl>
                  <SkillRating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="learningAgility"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center mb-2">
                  <BrainCircuit className="h-4 w-4 text-purple-500 mr-2" />
                  <FormLabel className="font-medium">Learning Agility</FormLabel>
                </div>
                <FormDescription>
                  Ability to quickly learn, apply knowledge, and adapt to new situations.
                </FormDescription>
                <FormControl>
                  <SkillRating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="innovation"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center mb-2">
                  <LightbulbIcon className="h-4 w-4 text-amber-500 mr-2" />
                  <FormLabel className="font-medium">Innovation</FormLabel>
                </div>
                <FormDescription>
                  Capacity to generate new ideas and creative solutions.
                </FormDescription>
                <FormControl>
                  <SkillRating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adaptability"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center mb-2">
                  <ArrowRightLeft className="h-4 w-4 text-blue-500 mr-2" />
                  <FormLabel className="font-medium">Adaptability</FormLabel>
                </div>
                <FormDescription>
                  Flexibility in responding to change and diverse work challenges.
                </FormDescription>
                <FormControl>
                  <SkillRating 
                    value={field.value} 
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit">Save Assessment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeSkillForm;
