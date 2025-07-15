import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "banned";
  joinedDate: string;
  lastLogin: string;
  location: string;
  totalPredictions: number;
  accuracy: number;
  totalWinnings: number;
}

interface UserManagementContextType {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  promoteToAdmin: (id: string) => void;
  demoteToUser: (id: string) => void;
  banUser: (id: string) => void;
  unbanUser: (id: string) => void;
  getActiveUsers: () => User[];
  getAdminUsers: () => User[];
  getBannedUsers: () => User[];
}

const UserManagementContext = createContext<
  UserManagementContextType | undefined
>(undefined);

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error(
      "useUserManagement must be used within a UserManagementProvider",
    );
  }
  return context;
};

interface UserManagementProviderProps {
  children: React.ReactNode;
}

export const UserManagementProvider: React.FC<UserManagementProviderProps> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem("scoreguff_users");
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Error loading users:", error);
        initializeDefaultUsers();
      }
    } else {
      initializeDefaultUsers();
    }
  }, []);

  const initializeDefaultUsers = () => {
    const defaultUsers: User[] = [
      {
        id: "1",
        name: "Rajesh Shrestha",
        email: "rajesh@gmail.com",
        role: "admin",
        status: "active",
        joinedDate: "2023-06-15",
        lastLogin: "2024-01-19",
        location: "Kathmandu, Nepal",
        totalPredictions: 245,
        accuracy: 87.2,
        totalWinnings: 45600,
      },
      {
        id: "2",
        name: "Priya Gurung",
        email: "priya.gurung@yahoo.com",
        role: "user",
        status: "active",
        joinedDate: "2023-08-22",
        lastLogin: "2024-01-18",
        location: "Pokhara, Nepal",
        totalPredictions: 189,
        accuracy: 82.5,
        totalWinnings: 32400,
      },
      {
        id: "3",
        name: "Amit Rai",
        email: "amit.rai@hotmail.com",
        role: "user",
        status: "active",
        joinedDate: "2023-09-10",
        lastLogin: "2024-01-17",
        location: "Dharan, Nepal",
        totalPredictions: 156,
        accuracy: 79.8,
        totalWinnings: 28900,
      },
      {
        id: "4",
        name: "Sita Tamang",
        email: "sita.tamang@gmail.com",
        role: "user",
        status: "active",
        joinedDate: "2023-10-05",
        lastLogin: "2024-01-16",
        location: "Bharatpur, Nepal",
        totalPredictions: 98,
        accuracy: 84.1,
        totalWinnings: 18700,
      },
      {
        id: "5",
        name: "Binod Thapa",
        email: "binod.thapa@outlook.com",
        role: "user",
        status: "banned",
        joinedDate: "2023-07-18",
        lastLogin: "2023-12-15",
        location: "Biratnagar, Nepal",
        totalPredictions: 67,
        accuracy: 45.2,
        totalWinnings: 2100,
      },
    ];
    setUsers(defaultUsers);
    localStorage.setItem("scoreguff_users", JSON.stringify(defaultUsers));
  };

  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("scoreguff_users", JSON.stringify(updatedUsers));
  };

  const addUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...updates } : user,
    );
    saveUsers(updatedUsers);
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    saveUsers(updatedUsers);
  };

  const promoteToAdmin = (id: string) => {
    updateUser(id, { role: "admin" });
  };

  const demoteToUser = (id: string) => {
    updateUser(id, { role: "user" });
  };

  const banUser = (id: string) => {
    updateUser(id, { status: "banned" });
  };

  const unbanUser = (id: string) => {
    updateUser(id, { status: "active" });
  };

  const getActiveUsers = () => users.filter((user) => user.status === "active");
  const getAdminUsers = () => users.filter((user) => user.role === "admin");
  const getBannedUsers = () => users.filter((user) => user.status === "banned");

  const value: UserManagementContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    promoteToAdmin,
    demoteToUser,
    banUser,
    unbanUser,
    getActiveUsers,
    getAdminUsers,
    getBannedUsers,
  };

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};
