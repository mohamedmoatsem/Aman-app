// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // محاولة استعادة الجلسة من localStorage عند التحميل
  useEffect(() => {
    const storedUser = localStorage.getItem("aman_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("aman_user");
      }
    }
    setLoading(false);
  }, []);

  // تسجيل الدخول (وهمي حالياً – سيُستبدل بطلب API)
  const login = async (username, password) => {
    if (username && password) {
      const fakeUser = {
        id: 1,
        username: username,
        role: username.includes("doctor") ? "professional" : "user",
      };
      localStorage.setItem("aman_user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return { success: true, user: fakeUser };
    }
    return { success: false, error: "بيانات غير صالحة" };
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("aman_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};