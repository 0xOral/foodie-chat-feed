
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Book, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserCourses } from "@/data/coursesData";

interface CourseSidebarProps {
  activeCourseId?: string;
}

const CourseSidebar = ({ activeCourseId }: CourseSidebarProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const userCourses = currentUser ? getUserCourses(currentUser.id) : [];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foodle-accent">Courses</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={!activeCourseId}>
                <Link to="/">
                  <Home className="h-5 w-5" />
                  <span>All Posts</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>My Courses</SidebarGroupLabel>
          <SidebarMenu>
            {userCourses.length > 0 ? (
              userCourses.map(course => (
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeCourseId === course.id}
                    tooltip={course.name}
                  >
                    <Link to={`/course/${course.id}`}>
                      <Book className="h-5 w-5" />
                      <span>{course.code}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400">
                No courses enrolled
              </div>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CourseSidebar;
