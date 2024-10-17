import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLogginIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post('/api/v1/auth/signup', credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success('Account created successful');
    } catch (error) {
      toast.error(error.response.data.message || 'Signup Failed!');
      set({ isSigningUp: false, user: null });
    }
  },
  login: async (credentials) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post('/api/v1/auth/login', credentials);
      set({ user: response.data.user, isLogginIn: false });
      toast.success('Login successful');
    } catch (error) {
      set({ isLogginIn: false, user: null });
      toast.error(error.response.data.message || 'Login Failed!');
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post('/api/v1/auth/logout');
      set({ user: null, isLoggingOut: false });
      toast.success('Logout successfully');
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || 'Logout Failed');
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get('/api/v1/auth/authCheck');
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
      // toast.error(error.response.data.message || 'An error occured');
    }
  },
}));