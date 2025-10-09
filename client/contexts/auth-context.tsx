import api from "@/interceptor/api";
import * as SecureStore from "expo-secure-store";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProp = {
  isLoading: boolean;
  login: any;
  logout: any;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProp | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (refreshToken && accessToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          const isValidSession = await validateSession();
          setIsAuthenticated(isValidSession);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuth();
  }, []);

  const validateSession = async () => {
    try {
      if (!accessToken || !refreshToken) return false;
      const response = await api.get("/auth/valid");
      return response.status === 200;
    } catch (error) {
      await logout();
      return false;
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      const responseAPI = response.data;

      const tokens = {
        access: responseAPI.tokens?.accessToken,
        refresh: responseAPI.tokens?.refreshToken,
      };

      if (tokens && tokens.access && tokens.refresh) {
        await SecureStore.setItemAsync("accessToken", String(tokens.access));
        await SecureStore.setItemAsync("refreshToken", String(tokens.refresh));
        setAccessToken(String(tokens.access));
        setRefreshToken(String(tokens.refresh));
        setIsAuthenticated(true);
      } else {
        throw new Error("Hiányzó bejelentkezési token");
      }
      return true;
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
