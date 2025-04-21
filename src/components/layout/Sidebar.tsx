
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart2, 
  Users, 
  FileText, 
  Settings, 
  Menu, 
  ChevronLeft, 
  Home,
  Network,
  GraduationCap,
  ListCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-mews-navy">
            Mews Talent Acceleration
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-4 flex flex-col justify-between">
        <ul className="space-y-1">
          <SidebarItem
            to="/"
            icon={<Home size={20} />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/talent-map"
            icon={<Network size={20} />}
            label="Talent Map"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/skill-assessment"
            icon={<GraduationCap size={20} />}
            label="Skill Enabler Assessment"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/employees"
            icon={<Users size={20} />}
            label="Employees"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/development-actions"
            icon={<ListCheck size={20} />}
            label="Development Actions"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/reports"
            icon={<BarChart2 size={20} />}
            label="Reports"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/data-import"
            icon={<FileText size={20} />}
            label="Data Import"
            collapsed={collapsed}
          />
        </ul>

        {/* Settings menu and added feedback message below */}
        <div>
          <SidebarItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed}
          />
          {!collapsed && (
            <div className="mt-4 px-4 text-xs text-gray-500 leading-relaxed">
              Got ideas or feedback about this app?{" "}
              <a
                href="mailto:debora.gallo78@gmail.com"
                className="text-blue-600 font-semibold hover:underline"
              >
                Drop me a line
              </a>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarItem = ({ to, icon, label, collapsed }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center px-4 py-2 rounded-md text-mews-navy hover:bg-mews-light-blue transition-colors",
          {
            "justify-center": collapsed,
            "hover:text-mews-coral": true,
          }
        )}
      >
        <span className="mr-3">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Link>
    </li>
  );
};
