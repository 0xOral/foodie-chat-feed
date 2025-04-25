import { toast } from "sonner";
import type { Post } from "@/data/mockData";

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  instructor: string;
  enrolledStudents: string[];
  requiresAccessCode?: boolean;
}

export const fetchCourses = async () => {
  try {
    const response = await fetch('http://localhost/api/courses');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    toast.error("Failed to fetch courses");
    throw error;
  }
};

export const fetchCourseById = async (courseId: string) => {
  try {
    const response = await fetch(`http://localhost/api/courses/${courseId}`);
    if (!response.ok) {
      throw new Error('Course not found');
    }
    return await response.json();
  } catch (error) {
    toast.error("Course not found");
    throw error;
  }
};

export const joinCourse = async (userId: string, courseId: string, accessCode?: string) => {
  try {
    const response = await fetch(`http://localhost/api/courses/${courseId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, accessCode }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to join course');
    }
    
    const result = await response.json();
    toast.success(`Successfully joined ${result.course.name}`);
    return result;
  } catch (error) {
    toast.error("Failed to join course");
    throw error;
  }
};

export const leaveCourse = async (userId: string, courseId: string) => {
  try {
    const response = await fetch(`http://localhost/api/courses/${courseId}/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to leave course');
    }
    
    const result = await response.json();
    toast.success(`Successfully left course`);
    return result;
  } catch (error) {
    toast.error("Failed to leave course");
    throw error;
  }
};
