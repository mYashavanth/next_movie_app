import AuthContextProvider from "@/authContext/authContextProvider";
import Navbar from "@/components/navBar";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";

const config = {
  initialColorMode: "light", // Set the default mode
  useSystemColorMode: false, // Set to `true` to respect the user's OS preference
};

const theme = extendTheme({ config });

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </>
  );
}
