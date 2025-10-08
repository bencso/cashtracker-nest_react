import api from '@/interceptor/api';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthContextProp = {
    isLoading: boolean;
    login: any;
    logout: any;
};

const AuthContext = createContext<AuthContextProp | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync("accessToken");
                const refreshToken = await SecureStore.getItemAsync("refreshToken");
                if (refreshToken && accessToken) {
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadAuth();
    }, []);

    const login = async ({ email, password }: {
        email: string;
        password: string
    }) => {
        try {
            const response = await api.post("/auth/login", {
                email: email,
                password: password
            });

            const tokens = response.data.data;
            console.log(tokens);
            await SecureStore.setItemAsync('accessToken', String(tokens.access));
            await SecureStore.setItemAsync('refreshToken', String(tokens.refresh));
            setAccessToken(String(tokens.access));
            setRefreshToken(String(tokens.refresh));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");
            setAccessToken(null);
            setRefreshToken(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}