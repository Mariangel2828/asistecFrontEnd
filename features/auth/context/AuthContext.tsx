import React, { createContext, useContext, useState } from 'react';

// this context is used to manage the authentication state of the user between the app
// and the backend. It provides a way to store and access the authentication data

export type AuthData = {
    // this type is used to define the structure of the authentication data
    // that is stored in the context
    // and passed to the components that need it
    userId: string;
    email: string;
    fullname: string;
};

    const AuthContext = createContext<any>(null);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthData | null>(null);

    // We pass the auth state and the setAuth function to the context
    // so that we can access them in the components that need them
    // and update the authentication state when the user logs in or out
    return (
        <AuthContext.Provider value={{ auth, setAuth }}> 
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
