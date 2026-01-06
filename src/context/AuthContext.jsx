import { createContext, useState } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role); // 👈 store role
    localStorage.setItem("name", res.data.name);
    setRole(res.data.role);

    return res.data.role; 

    
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
