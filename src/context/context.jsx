import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useToken = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Surveille le localStorage en cas de changement externe
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(prev => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

