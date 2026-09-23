import React, { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(3, 'Пароль должен быть не менее 3 символов'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  lastName: z.string().min(2, 'Фамилия должна быть не менее 2 символов'),
  email: z.string().email('Неверный формат email'),
  password: z.string().min(3, 'Пароль должен быть не менее 3 символов'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email'),
  phone: z.string()
    .regex(/^[\d\s\+\(\)\-]{7,20}$/, 'Введите корректный номер телефона')
    .optional()
    .or(z.literal('')),
  address: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export interface UserData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  registrationDate?: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (data: LoginFormData) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterFormData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<UserData>) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'camp_users',
  CURRENT_USER: 'camp_current_user',
};

interface StoredUser extends RegisterFormData {
  registrationDate?: string;
}

const loadUsers = (): StoredUser[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.USERS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<StoredUser[]>(() => loadUsers());
  
  const [user, setUser] = useState<UserData | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const login = async (data: LoginFormData): Promise<{ success: boolean; error?: string }> => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return { success: false, error: firstError.message };
    }

    const existingUser = users.find(u => u.email === data.email);
    if (!existingUser) {
      return { success: false, error: 'Пользователь не найден' };
    }
    
    if (existingUser.password !== data.password) {
      return { success: false, error: 'Неверный пароль' };
    }

    const userData: UserData = { 
      name: `${existingUser.firstName} ${existingUser.lastName}`, 
      email: existingUser.email,
      phone: existingUser.phone || '',
      address: existingUser.address || '',
      registrationDate: existingUser.registrationDate || new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
    return { success: true };
  };

  const register = async (data: RegisterFormData): Promise<{ success: boolean; error?: string }> => {
    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return { success: false, error: firstError.message };
    }

    if (users.some(u => u.email === data.email)) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const newUser: StoredUser = {
      ...data,
      registrationDate: new Date().toISOString(),
    };
    
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    saveUsers(newUsers);
    
    const userData: UserData = { 
      name: `${data.firstName} ${data.lastName}`, 
      email: data.email,
      phone: data.phone || '',
      address: data.address || '',
      registrationDate: newUser.registrationDate,
    };
    setUser(userData);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const updateUser = async (data: Partial<UserData>): Promise<{ success: boolean; error?: string }> => {
    if (data.name || data.email) {
      const validationData = {
        name: data.name || user?.name || '',
        email: data.email || user?.email || '',
        phone: data.phone,
        address: data.address,
      };
      
      const result = updateProfileSchema.safeParse(validationData);
      if (!result.success) {
        const firstError = result.error.issues[0];
        return { success: false, error: firstError.message };
      }
    }

    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
      
      const updatedUsers = users.map(u => 
        u.email === user.email ? { ...u, ...data, firstName: data.name?.split(' ')[0] || u.firstName, lastName: data.name?.split(' ')[1] || u.lastName } : u
      );
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      return { success: true };
    }
    return { success: false, error: 'Пользователь не найден' };
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};