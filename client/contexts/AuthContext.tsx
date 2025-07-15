import * as React from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check for existing session on app load
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("scoreguff_user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem("scoreguff_user");
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - in real app, this would be an actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password combination
      const userData: User = {
        id: "1",
        email: email,
        name: email.split("@")[0],
        avatar: "/placeholder.svg",
      };

      setUser(userData);
      localStorage.setItem("scoreguff_user", JSON.stringify(userData));
    } catch (err) {
      setError("Invalid email or password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userData: User = {
        id: "1",
        email: email,
        name: name,
        avatar: "/placeholder.svg",
      };

      setUser(userData);
      localStorage.setItem("scoreguff_user", JSON.stringify(userData));
    } catch (err) {
      setError("Failed to create account");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("scoreguff_user");
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
