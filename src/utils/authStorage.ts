import { UserAccount, UserProgress } from '../types';
import { INITIAL_USER_PROGRESS } from '../data/initialData';

const USERS_STORAGE_KEY = 'leb_registered_users_v1';
const CURRENT_USER_KEY = 'leb_active_session_v1';

// Simple deterministic hash for password safety in browser storage
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + btoa(str).slice(0, 8);
}

export function getRegisteredUsers(): UserAccount[] {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse registered users:', err);
    return [];
  }
}

export function saveRegisteredUsers(users: UserAccount[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (!data) return null;
    const session = JSON.parse(data);
    
    // Refresh with latest data from users list
    const users = getRegisteredUsers();
    const found = users.find(u => u.id === session.id || u.email.toLowerCase() === session.email.toLowerCase());
    return found || session;
  } catch (err) {
    console.error('Failed to get current user:', err);
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (err) {
    console.error('Failed to set current user:', err);
  }
}

export function registerUser(params: {
  name: string;
  email: string;
  password: string;
  jurisdiction: 'Angola' | 'Portugal' | 'Brasil' | 'Global';
  role?: string;
  currentProgress?: UserProgress;
}): { success: boolean; error?: string; user?: UserAccount } {
  const emailClean = params.email.trim().toLowerCase();
  const nameClean = params.name.trim();

  if (!nameClean || nameClean.length < 3) {
    return { success: false, error: 'Por favor, informe seu nome completo (mínimo 3 caracteres).' };
  }

  if (!emailClean || !emailClean.includes('@') || !emailClean.includes('.')) {
    return { success: false, error: 'Por favor, insira um endereço de e-mail válido.' };
  }

  if (!params.password || params.password.length < 6) {
    return { success: false, error: 'A palavra-passe/senha deve ter no mínimo 6 caracteres.' };
  }

  const users = getRegisteredUsers();
  const existing = users.find(u => u.email.toLowerCase() === emailClean);

  if (existing) {
    return { success: false, error: 'Já existe uma conta cadastrada com este endereço de e-mail. Faça login.' };
  }

  const baseProgress: UserProgress = params.currentProgress 
    ? { ...params.currentProgress, studentName: nameClean } 
    : { ...INITIAL_USER_PROGRESS, studentName: nameClean };

  const newUser: UserAccount = {
    id: 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
    name: nameClean,
    email: emailClean,
    passwordHash: simpleHash(params.password),
    role: params.role || 'Formação Intensiva — Engenharia Civil & Ambiental',
    jurisdiction: params.jurisdiction,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    progress: baseProgress
  };

  users.push(newUser);
  saveRegisteredUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUser(email: string, password: string): { success: boolean; error?: string; user?: UserAccount } {
  const emailClean = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === emailClean);

  if (!user) {
    return { success: false, error: 'Conta não encontrada com este e-mail. Verifique a digitação ou cadastre-se.' };
  }

  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, error: 'Palavra-passe / senha incorreta. Tente novamente.' };
  }

  // Update last login timestamp
  user.lastLoginAt = new Date().toISOString();
  saveRegisteredUsers(users);
  setCurrentUser(user);

  return { success: true, user };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function saveUserProgress(userId: string, progress: UserProgress): void {
  const users = getRegisteredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    users[idx].progress = progress;
    saveRegisteredUsers(users);

    const current = getCurrentUser();
    if (current && current.id === userId) {
      current.progress = progress;
      setCurrentUser(current);
    }
  }
}

export function exportUserData(user: UserAccount): string {
  const backup = {
    application: 'Lopes Engenharia Book',
    version: '2026.1',
    exportDate: new Date().toISOString(),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      jurisdiction: user.jurisdiction,
      role: user.role
    },
    performanceData: user.progress
  };
  return JSON.stringify(backup, null, 2);
}

export function importUserData(jsonString: string): { success: boolean; error?: string; user?: UserAccount } {
  try {
    const data = JSON.parse(jsonString);
    if (!data.user || !data.performanceData) {
      return { success: false, error: 'Formato de arquivo inválido. Deve ser um backup gerado pelo Lopes Engenharia Book.' };
    }

    const current = getCurrentUser();
    if (current) {
      current.progress = data.performanceData;
      current.name = data.user.name || current.name;
      saveUserProgress(current.id, current.progress);
      return { success: true, user: current };
    } else {
      // Register or restore as new local user
      const users = getRegisteredUsers();
      const existing = users.find(u => u.email.toLowerCase() === data.user.email?.toLowerCase());
      if (existing) {
        existing.progress = data.performanceData;
        saveRegisteredUsers(users);
        setCurrentUser(existing);
        return { success: true, user: existing };
      }

      const restoredUser: UserAccount = {
        id: data.user.id || ('usr_' + Date.now().toString(36)),
        name: data.user.name || 'Engenheiro(a)',
        email: data.user.email || `restored_${Date.now()}@lopesbook.local`,
        passwordHash: simpleHash('backup123'),
        role: data.user.role || 'Engenharia Civil & Ambiental',
        jurisdiction: data.user.jurisdiction || 'Angola',
        createdAt: data.exportDate || new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        progress: data.performanceData
      };

      users.push(restoredUser);
      saveRegisteredUsers(users);
      setCurrentUser(restoredUser);
      return { success: true, user: restoredUser };
    }
  } catch (e) {
    return { success: false, error: 'Erro ao interpretar o arquivo JSON: ' + (e instanceof Error ? e.message : 'desconhecido') };
  }
}
