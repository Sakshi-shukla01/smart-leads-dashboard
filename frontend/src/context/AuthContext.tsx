import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { AuthState, User, LoginPayload, RegisterPayload } from '../types';
import { authApi } from '../api/authApi';

// ─── Types ─────────────────────────────────────────────────────────────────────

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return { user: null, token: null, isAuthenticated: false, isLoading: false };
    default:
      return state;
  }
};

// ─── Initial State ─────────────────────────────────────────────────────────────

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user: User | null = userStr ? (JSON.parse(userStr) as User) : null;

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading: false,
  };
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const persistAuth = (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const login = useCallback(async (payload: LoginPayload): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { user, token } = await authApi.login(payload);
      persistAuth(user, token);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { user, token } = await authApi.register(payload);
      persistAuth(user, token);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};