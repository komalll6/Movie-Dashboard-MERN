//new- 27-07-26 (new file)

import { useContext } from "react";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(); // creating a context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = localStorage.getItem("user");
    if (getUser) {
      setUser(JSON.parse(getUser)); //set user variable everytime website renders
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <>
      <AuthContext.Provider value={{ user, loginUser, loading }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}
