
import { toast } from "sonner";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const response = await fetch('http://localhost/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error("Login failed. Please try again.");
    throw error;
  }
};

export const register = async (data: RegisterData) => {
  try {
    const response = await fetch('http://localhost/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    toast.error("Registration failed. Please try again.");
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  // In a real app, you would invalidate the token on the server
  return;
};
