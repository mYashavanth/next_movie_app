import { useContext, useState, useEffect } from "react";
import styles from "../styles/login.module.css";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AuthContext } from "@/authContext/authContextProvider";

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [parsedLoginData, setParsedLoginData] = useState({});
  const toast = useToast();

  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    const loginData = localStorage.getItem("user");
    if (loginData) {
      setParsedLoginData(JSON.parse(loginData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(parsedLoginData);

    if (
      user.email === parsedLoginData.email &&
      user.password === parsedLoginData.password
    ) {
      setIsAuth(true);
      router.push("/"); // Using router.push for navigation
      toast({
        title: "Success.",
        description: "Login Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed.",
        description: "Login Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setUser({
      email: "",
      password: "",
    });
  };

  console.log(user);
  console.log(isAuth);

  return (
    <>
      {isAuth ? (
        <div>
          <h1>
            Welcome{" "}
            {parsedLoginData.name ? parsedLoginData.name.toUpperCase() : "User"}
          </h1>
          <button onClick={() => setIsAuth(false)}>Logout</button>
        </div>
      ) : (
        <Box className={styles.signupMain}>
          <form onSubmit={handleSubmit}>
            <Box className={styles.signupForm}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
              />
              <Button type="submit" colorScheme="teal">Login</Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
}
