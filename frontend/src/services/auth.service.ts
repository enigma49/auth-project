import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface AuthResult {
    success: boolean;
    data?: AuthResponse;
    error?: {
      message: string | string[];
      error?: string;
      statusCode: number;
    };
  }

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/';
  }

  async signup(userData: SignupData): Promise<AuthResult> {
    return this.authRequest('sign-up', userData);
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    return this.authRequest('login', credentials);
  }

  private async authRequest(endpoint: 'sign-up' | 'login', data: SignupData | LoginCredentials): Promise<AuthResult> {
    try {
        const url = endpoint === 'login' ? `${this.baseUrl}/auth/login` : `${this.baseUrl}/user/${endpoint}`;
        const response = await axios.post<AuthResponse | AuthResult['error']>(url, data);
      
      // Check if the response contains an error
      if (response?.data &&'error' in response.data) {
        return {
          success: false,
          error: response.data
        };
      }

      return {
        success: true,
        data: response.data as AuthResponse
      };
    } catch (error) {
      const errorResponse = error.response?.data || { message: `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} failed`, statusCode: 400, error: 'Bad Request' };
      return {
        success: false,
        error: errorResponse
      };
    }
  }

  async googleLogin(): Promise<void> {
    try {
      window.location.href = `${this.baseUrl}/auth/google/login`;
    } catch (error) {
        console.error(error);
      throw new Error('Login failed');
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();
