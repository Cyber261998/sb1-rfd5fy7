import create from 'zustand';
import { User } from '../types';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const ADMIN_EMAIL = 'zhetai@518004.com';
const ADMIN_PASSWORD = 'admin';

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = email === ADMIN_EMAIL;
      set({ 
        user: { 
          id: result.user.uid, 
          email: result.user.email!, 
          name: isAdmin ? 'Admin' : '', 
          address: '', 
          country: '' 
        } 
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password, name) => {
    try {
      set({ loading: true, error: null });
      const result = await createUserWithEmailAndPassword(auth, email, password);
      set({ 
        user: { 
          id: result.user.uid, 
          email: result.user.email!, 
          name, 
          address: '',
          country: ''
        } 
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));