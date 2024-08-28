import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/navBar.module.css";
import { AuthContext } from "@/authContext/authContextProvider";
import Link from "next/link";

export default function Navbar() {
  const [data, setData] = useState({});
  const { isAuth, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    const loginData = localStorage.getItem("user");
    if (loginData) {
      setData(JSON.parse(loginData));
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      {!isAuth && <Link href="/signup">Sign Up</Link>}
      <Link href="/login">{isAuth ? data.name.toUpperCase() : "Login"}</Link>
      {isAuth && <button onClick={() => setIsAuth(false)}>Logout</button>}
    </nav>
  );
}
