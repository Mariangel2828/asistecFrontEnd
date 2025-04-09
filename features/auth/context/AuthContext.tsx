import React, { createContext, useContext, useState } from 'react';

export type AuthData = {
    userId: string;
    email: string;
    fullname: string;
};

    const AuthContext = createContext<any>(null);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthData | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
