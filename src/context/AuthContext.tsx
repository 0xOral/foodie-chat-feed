
import { createContext, useState, useContext, ReactNode } from "react";
import { User, users } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock authentication
        const user = users.find((u) => u.username === username);
        
        if (user && password === "password") { // Mock password check
          setCurrentUser(user);
          toast({
            title: "Logged in successfully",
            description: `Welcome back, ${user.username}!`,
          });
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Invalid username or password",
            variant: "destructive",
          });
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists
        const userExists = users.some((u) => u.username === username);
        
        if (userExists) {
          toast({
            title: "Registration failed",
            description: "Username already exists",
            variant: "destructive",
          });
          resolve(false);
        } else {
          // In a real app, we would create a new user in the database
          const newUser: User = {
            id: `${users.length + 1}`,
            username,
            profilePicture: "/placeholder.svg",
            karma: 0, // Initialize karma to 0 for new users
            enrolledCourses: [] // Initialize with empty array of enrolled courses
          };
          
          // Note: In this mock implementation, we're not actually adding the user to our users array
          // as that would modify our mock data. In a real app, we would add the user to the database.
          setCurrentUser(newUser);
          
          toast({
            title: "Registration successful",
            description: `Welcome to Foodle, ${username}!`,
          });
          resolve(true);
        }
      }, 500); // Simulate network delay
    });
  };

  const value = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
