
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Employee, Readiness, Zone } from "@/types/employee";

interface ConstellationFiltersProps {
  employees: Employee[];
  filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
  };
  setFilter: (filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
  }) => void;
  filteredEmployees: Employee[];
}

const ConstellationFilters = ({
  employees,
  filter,
  setFilter,
  filteredEmployees,
}: ConstellationFiltersProps) => {
  const { toast } = useToast();
  
  // Get unique departments for filter dropdown
  const departments = ['All', ...Array.from(new Set(employees.map(emp => emp.department)))];

  // Reset all filters
  const resetFilters = () => {
    setFilter({
      department: 'All',
      zone: 'All',
      readiness: 'All',
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select 
              value={filter.department} 
              onValueChange={(value) => setFilter({...filter, department: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Zone</label>
            <Select 
              value={filter.zone} 
              onValueChange={(value) => setFilter({...filter, zone: value as Zone | 'All'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Zones</SelectItem>
                <SelectItem value="Acceleration">Acceleration Zone</SelectItem>
                <SelectItem value="Development">Development Zone</SelectItem>
                <SelectItem value="Support">Support Zone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Readiness</label>
            <Select 
              value={filter.readiness} 
              onValueChange={(value) => setFilter({...filter, readiness: value as Readiness | 'All'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select readiness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Ready Now">Ready Now</SelectItem>
                <SelectItem value="Ready Soon">Ready Soon</SelectItem>
                <SelectItem value="Not Ready">Not Ready</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button onClick={resetFilters} variant="outline" className="w-full">
              <RefreshCw size={16} className="mr-2" />
              Reset
            </Button>
            <Button className="w-full">
              <Filter size={16} className="mr-2" />
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Showing {filteredEmployees.length} of {employees.length} employees</p>
      </div>
    </>
  );
};

export default ConstellationFilters;
