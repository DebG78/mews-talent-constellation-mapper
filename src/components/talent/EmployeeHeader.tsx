
import { Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmployeeHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline">
          <Download size={16} className="mr-2" />
          Export
        </Button>
        <Button>
          <UserPlus size={16} className="mr-2" />
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default EmployeeHeader;
