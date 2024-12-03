import { toast } from 'react-toastify';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://ethiochicken-erp-backend.onrender.com/api'
interface ApiResponse<T> {
  data: T;
  error?: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || 'An error occurred';
    toast.error(error);
    throw new Error(error);
  }
  
  return { data };
}

export const api = {
  async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data: any, token?: string): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, data: any, token?: string): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });

    return handleResponse<T>(response);
  },

  async delete(endpoint: string, token?: string): Promise<void> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete');
    }
  }
};