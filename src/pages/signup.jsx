import React, { useState } from "react";
import styles from "../styles/signup.module.css";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignUp() {
  const NavigatTo = useRouter().push;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === "") {
      // alert("Please fill all the fields")
      toast({
        title: "Failed.",
        description: "Please fill all the fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      NavigatTo("/login");
    }

    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  console.log(user);
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="signup" />
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <Box className={styles.signupMain}>
        <form action="" onSubmit={handleSubmit}>
          <Box className={styles.signupForm}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              value={user.name}
            />
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
            <Button type="submit" colorScheme="teal" p={"24px"}>
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
