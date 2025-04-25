
import { toast } from "sonner";
import { getCourseById, getCourses } from "@/data/coursesData";

export const fetchCourses = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return getCourses();
};

export const fetchCourseById = async (courseId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const course = getCourseById(courseId);
  
  if (!course) {
    toast.error("Course not found");
    throw new Error("Course not found");
  }
  
  return course;
};

export const joinCourse = async (userId: string, courseId: string, accessCode?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const course = getCourseById(courseId);
  
  if (!course) {
    toast.error("Course not found");
    throw new Error("Course not found");
  }
  
  // In a real app, you would validate the access code if required
  // For now, we'll just check if an access code is provided when needed
  if (course.requiresAccessCode && (!accessCode || accessCode !== "1234")) {
    toast.error("Invalid access code");
    throw new Error("Invalid access code");
  }
  
  // In a real app, you would add the course to the user's enrolled courses
  toast.success(`Successfully joined ${course.name}`);
  
  return {
    success: true,
    course
  };
};

export const leaveCourse = async (userId: string, courseId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const course = getCourseById(courseId);
  
  if (!course) {
    toast.error("Course not found");
    throw new Error("Course not found");
  }
  
  // In a real app, you would remove the course from the user's enrolled courses
  toast.success(`Successfully left ${course.name}`);
  
  return {
    success: true
  };
};
