import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockEmployees = [
    {
      id: "EMP001",
      name: "Sarah Johnson",
      role: "employee",
      email: "sarah.johnson@company.com",
      department: "Engineering",
      position: "Senior Developer",
      password: "password123",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150",
      startDate: "2022-01-15",
      leaveBalance: { annual: 15, sick: 8, personal: 3 }
    },
    {
      id: "EMP002",
      name: "Michael Chen", 
      role: "manager",
      email: "michael.chen@company.com",
      department: "Engineering",
      position: "Engineering Manager",
      password: "manager123",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      startDate: "2020-03-20",
      teamMembers: ["EMP001", "EMP003", "EMP004"],
      leaveBalance: { annual: 20, sick: 10, personal: 5 }
    },
    {
      id: "ADMIN001",
      name: "David Wilson",
      role: "admin",
      email: "david.wilson@company.com",
      department: "HR", 
      position: "HR Director",
      password: "admin123",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      startDate: "2019-09-10",
      leaveBalance: { annual: 25, sick: 15, personal: 8 }
    }
  ];

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (employeeId, password) => {
    try {
      const employee = mockEmployees.find(
        emp => emp.id === employeeId && emp.password === password
      );
      
      if (employee) {
        const userData = { ...employee };
        delete userData.password;
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};