
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const EmployeeFilters = ({ searchQuery, setSearchQuery }: EmployeeFiltersProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Filter
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>All Employees</DropdownMenuItem>
          <DropdownMenuItem>Acceleration Zone</DropdownMenuItem>
          <DropdownMenuItem>Development Zone</DropdownMenuItem>
          <DropdownMenuItem>Support Zone</DropdownMenuItem>
          <DropdownMenuItem>Ready Now</DropdownMenuItem>
          <DropdownMenuItem>Ready Soon</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EmployeeFilters;
