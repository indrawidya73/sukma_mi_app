import { User, UserRole } from './auth.types';

// Mock users database (production-ready bisa gunakan actual database)
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin',
      role: 'admin',
      name: 'Administrator',
      email: 'admin@miislamiyah.sch.id',
    },
  },
  guru: {
    password: 'guru123',
    user: {
      id: '2',
      username: 'guru',
      role: 'guru',
      name: 'Guru Kelas',
      email: 'guru@miislamiyah.sch.id',
    },
  },
  murid: {
    password: 'murid123',
    user: {
      id: '3',
      username: 'murid',
      role: 'murid',
      name: 'Siswa',
      email: 'murid@miislamiyah.sch.id',
    },
  },
};

const AUTH_STORAGE_KEY = 'sukma_auth_user';

export async function authenticate(
  username: string,
  password: string
): Promise<User> {
  // Simulate async call
  await new Promise((resolve) => setTimeout(resolve, 300));

  const userRecord = MOCK_USERS[username.toLowerCase()];

  if (!userRecord || userRecord.password !== password) {
    throw new Error('Username atau password salah');
  }

  return userRecord.user;
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
