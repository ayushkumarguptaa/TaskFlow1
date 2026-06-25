import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/user/auth/me`,
            {
              withCredentials: true,
            }
          );

        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);