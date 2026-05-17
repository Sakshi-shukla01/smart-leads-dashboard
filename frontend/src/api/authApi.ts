import axiosInstance from './axios';
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../types';

interface AuthResponseData {
  token: string;
  user: User;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponseData> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponseData>>(
      '/auth/login',
      payload
    );
    return data.data!;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponseData> => {
    const { data } = await axiosInstance.post<ApiResponse<AuthResponseData>>(
      '/auth/register',
      payload
    );
    return data.data!;
  },

  getMe: async (): Promise<User> => {
    const { data } = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return data.data!;
  },
};