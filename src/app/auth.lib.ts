import { User, UserRole } from './auth.types';
import { supabase } from '@/utils/supabase';

const AUTH_STORAGE_KEY = 'sukma_auth_user';

export async function authenticate(
  username: string,
  password: string
): Promise<User> {
  // Query Supabase profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username.toLowerCase())
    .single();

  if (error || !data) {
    throw new Error('Username tidak ditemukan');
  }

  // In production, password should be hashed. For now, we compare direct (as per mock logic)
  if (data.password !== password) {
    throw new Error('Password salah');
  }

  return {
    id: data.id,
    username: data.username,
    role: data.role as UserRole,
    name: data.name,
    email: data.email,
  };
}

export function saveUserToStorage(user: User): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.error('Failed to save user to storage:', error);
  }
}

export function getUserFromStorage(): User | null {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  } catch (error) {
    console.error('Failed to get user from storage:', error);
    return null;
  }
}

export function clearUserFromStorage(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to clear user from storage:', error);
  }
}

export function hasPermission(
  userRole: UserRole,
  requiredRoles: UserRole | UserRole[]
): boolean {
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Admin has access to everything
  if (userRole === 'admin') {
    return true;
  }

  return roles.includes(userRole);
}

export const roleHierarchy: Record<UserRole, number> = {
  admin: 3,
  guru: 2,
  murid: 1,
};

export function canPerformAction(
  userRole: UserRole,
  action: 'view' | 'create' | 'edit' | 'delete'
): boolean {
  switch (userRole) {
    case 'admin':
      return true; // Admin bisa semua
    case 'guru':
      return action !== 'view'; // Guru bisa create, edit, delete
    case 'murid':
      return action === 'view'; // Murid hanya bisa view
    default:
      return false;
  }
}
