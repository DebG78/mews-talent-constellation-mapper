
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw, User, Users } from "lucide-react";
import { Employee, Readiness, Zone, JobGrade } from "@/types/employee";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TalentMapFiltersProps {
  employees: Employee[];
  filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
    jobGrade: JobGrade;
  };
  setFilter: (filter: {
    department: string;
    zone: Zone | 'All';
    readiness: Readiness | 'All';
    jobGrade: JobGrade;
  }) => void;
  filteredEmployees: Employee[];
  resetFilters: () => void;
}

const TalentMapFilters = ({
  employees,
  filter,
  setFilter,
  filteredEmployees,
  resetFilters
}: TalentMapFiltersProps) => {
  // Get unique departments for filter dropdown
  const departments = ['All', ...Array.from(new Set(employees.map(emp => emp.department)))];

  return (
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
              <SelectItem value="Growth">Growth Zone</SelectItem>
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
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Job Grade</label>
          <RadioGroup 
            className="flex space-x-4 pt-1"
            value={filter.jobGrade}
            onValueChange={(value) => setFilter({...filter, jobGrade: value as JobGrade})}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="All" id="all" />
              <Label htmlFor="all" className="cursor-pointer">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="IC" id="ic" />
              <Label htmlFor="ic" className="flex items-center cursor-pointer">
                <User size={16} className="mr-1" />
                IC
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Manager" id="manager" />
              <Label htmlFor="manager" className="flex items-center cursor-pointer">
                <Users size={16} className="mr-1" />
                Manager
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button onClick={resetFilters} variant="outline" size="sm" className="w-full">
            <RefreshCw size={16} className="mr-1" />
            Reset
          </Button>
          <Button size="sm" className="w-full">
            <Filter size={16} className="mr-1" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentMapFilters;
