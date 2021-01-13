import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [notiToken, setNotiToken] = useState(null);
  const [refreshLoading, setRefreshLoading] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        notiToken,
        refreshLoading,
        loading,
        setUser,
        setToken,
        setNotiToken,
        setRefreshLoading,
        setLoading,
        login: async (email, password) => {
          try {
          } catch (e) {
            // setLoading(false);
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
