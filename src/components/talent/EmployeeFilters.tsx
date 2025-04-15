
import { Search, ChevronDown, Filter, RefreshCw, User, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Readiness, Zone, JobGrade } from "@/types/employee";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EmployeeFiltersProps {
  departments: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: string | null;
  onDepartmentChange: (department: string) => void;
  selectedZone: string | null;
  onZoneChange: (zone: string) => void;
  selectedReadiness: string | null;
  onReadinessChange: (readiness: string) => void;
  selectedJobGrade: string | null;
  onJobGradeChange: (jobGrade: string) => void;
  onResetFilters: () => void;
}

const EmployeeFilters = ({ 
  departments,
  searchQuery, 
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedZone,
  onZoneChange,
  selectedReadiness,
  onReadinessChange,
  selectedJobGrade,
  onJobGradeChange,
  onResetFilters
}: EmployeeFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={onResetFilters} 
            variant="outline" 
            size="sm"
          >
            <RefreshCw size={16} className="mr-1" />
            Reset Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Department</label>
          <Select 
            value={selectedDepartment || ''} 
            onValueChange={onDepartmentChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Zone</label>
          <Select 
            value={selectedZone || ''} 
            onValueChange={onZoneChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Zones</SelectItem>
              <SelectItem value="Acceleration">Acceleration Zone</SelectItem>
              <SelectItem value="Growth">Growth Zone</SelectItem>
              <SelectItem value="Support">Support Zone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Readiness</label>
          <Select 
            value={selectedReadiness || ''} 
            onValueChange={onReadinessChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Readiness Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Readiness Levels</SelectItem>
              <SelectItem value="Ready Now">Ready Now</SelectItem>
              <SelectItem value="Ready Soon">Ready Soon</SelectItem>
              <SelectItem value="Not Ready">Not Ready</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Job Grade</label>
          <RadioGroup 
            className="flex space-x-4 pt-1"
            value={selectedJobGrade || 'All'}
            onValueChange={onJobGradeChange}
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
      </div>
    </div>
  );
};

export default EmployeeFilters;
