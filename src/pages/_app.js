import AuthContextProvider from "@/authContext/authContextProvider";
import Navbar from "@/components/navBar";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
}
