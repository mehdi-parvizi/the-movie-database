import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: "linear(to left, #494949, #181818)",
        minHeight: "100vh",
        margin: 0,
      },
    },
  },
});

export default theme;
