import { createContext, useState , useEffect } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
    
  const [isAuth, setIsAuth] = useState(false);
  const [search, setSearch] = useState("Thor");
  console.log({ setIsAuth });
  useEffect(() => {
    const loginData = localStorage.getItem("user");
    if (loginData) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, search, setSearch }}>
      {children}
    </AuthContext.Provider>
  );
}
