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
// 

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Safe JSON Parsing for User State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      // "undefined" string ya invalid format aane par crash hone se bachata hai
      if (!savedUser || savedUser === "undefined") {
        return null;
      }
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      localStorage.removeItem("user"); // Corrupted user data clean karta hai
      return null;
    }
  });

  // Safe Token State Retrieval
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken || savedToken === "undefined") {
      return null;
    }
    return savedToken;
  });

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