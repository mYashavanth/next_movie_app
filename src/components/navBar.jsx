import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/navBar.module.css";
import { AuthContext } from "@/authContext/authContextProvider";
import Link from "next/link";

export default function Navbar() {
  const [data, setData] = useState({});
  const { isAuth, setIsAuth } = useContext(AuthContext);

  // Fetch user data from localStorage when component mounts
  useEffect(() => {
    const loginData = localStorage.getItem("user");
    if (loginData) {
      setData(JSON.parse(loginData));
    }
  }, []);

  // Logout function to clear auth state and local storage
  const logoutFunction = () => {
    setIsAuth(false);
    localStorage.removeItem("user"); // Clear user data from localStorage
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      {!isAuth && <Link href="/signup">Sign Up</Link>}
      <Link href="/login">{isAuth ? data.name.toUpperCase() : "Login"}</Link>
      {isAuth && <button onClick={logoutFunction}>Logout</button>}
    </nav>
  );
}
