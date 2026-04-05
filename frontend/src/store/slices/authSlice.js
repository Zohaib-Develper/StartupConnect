import { createSlice } from '@reduxjs/toolkit';

const mockUsers = [
  {
    id: '1',
    name: 'Ali Hassan',
    email: 'ali@gmail.com',
    password: 'password123',
    role: 'founder',
    avatar: null,
    joinedDate: '2025-01-15',
  },
  {
    id: '2',
    name: 'Sara Ahmed',
    email: 'sara@gmail.com',
    password: 'password123',
    role: 'investor',
    avatar: null,
    joinedDate: '2025-02-20',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    avatar: null,
    joinedDate: '2024-12-01',
  },
  {
    id: '4',
    name: 'Zohaib Musharraf',
    email: 'zohaib@gmail.com',
    password: 'password123',
    role: 'founder',
    avatar: null,
    joinedDate: '2025-03-10',
  },
  {
    id: '5',
    name: 'Chand Ali',
    email: 'chand@gmail.com',
    password: 'password123',
    role: 'investor',
    avatar: null,
    joinedDate: '2025-03-15',
  },
];

const storedUser = localStorage.getItem('startup_connect_user');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,
  users: mockUsers,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const safeUser = { ...user, password: undefined };
        state.user = safeUser;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('startup_connect_user', JSON.stringify(safeUser));
      } else {
        state.error = 'Invalid email or password';
      }
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    register: (state, action) => {
      const { name, email, password, role } = action.payload;
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        state.error = 'Email already registered';
        return;
      }
      const newUser = {
        id: String(state.users.length + 1),
        name,
        email,
        password,
        role,
        avatar: null,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      state.users.push(newUser);
      const safeUser = { ...newUser, password: undefined };
      state.user = safeUser;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('startup_connect_user', JSON.stringify(safeUser));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('startup_connect_user');
    },
    clearError: (state) => {
      state.error = null;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  register,
  logout,
  clearError,
  deleteUser,
} = authSlice.actions;

export default authSlice.reducer;
