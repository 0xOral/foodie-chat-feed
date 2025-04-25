
import { toast } from "sonner";
import { users } from "@/data/mockData";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would validate credentials against a backend
  // For now, we'll just return a mock user if the email contains "user"
  if (data.email.includes("user")) {
    return {
      success: true,
      user: {
        id: "1",
        username: "foodlover123",
        email: data.email,
        profilePicture: "/placeholder.svg",
        karma: 245
      },
      token: "mock-token-" + Math.random().toString(36).substring(2)
    };
  } else {
    toast.error("Invalid credentials");
    throw new Error("Invalid credentials");
  }
};

export const register = async (data: RegisterData): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if username or email already exists
  const existingUser = users.find(user => 
    user.username.toLowerCase() === data.username.toLowerCase()
  );
  
  if (existingUser) {
    toast.error("Username already taken");
    throw new Error("Username already taken");
  }
  
  // In a real app, you would create a new user in your database
  return {
    success: true,
    user: {
      id: "new-user-" + Math.random().toString(36).substring(2),
      username: data.username,
      email: data.email,
      profilePicture: "/placeholder.svg",
      karma: 0
    },
    token: "mock-token-" + Math.random().toString(36).substring(2)
  };
};

export const logout = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would invalidate the token on the server
  return;
};
