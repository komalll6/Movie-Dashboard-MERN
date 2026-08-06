//new- 27-07-26 (new file)

// import { useContext } from "react";
// import { createContext, useEffect, useState } from "react";

// const AuthContext = createContext(); // creating a context

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = localStorage.getItem("user");
//     if (getUser) {
//       setUser(JSON.parse(getUser)); //set user variable everytime website renders
//     }
//     setLoading(false);
//   }, []);

//   const loginUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   return (
//     <>
//       <AuthContext.Provider value={{ user, loginUser, loading }}>
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     return context;
// }

//new- 06-08-26
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);