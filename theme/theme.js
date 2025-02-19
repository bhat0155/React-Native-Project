import { createTheme } from "@rneui/themed";

const theme = createTheme({
  components: {
    Button: {
      raised: false,
      title: "Default title",
      buttonStyle: {
        backgroundColor: "#439ce0",
        borderRadius: 8,
        paddingVertical: 10,
      },
      containerStyle: {
        margin: 5,
      },
    },
    Text: {
      style: {
        color: "white",
      },
    },
  },
  mode: "light",
  darkColors: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#E0E0E0",
    subtitle: "#B0B0B0",
    primary: "#FF9800",
    secondary: "#03A9F4",
  },
  lightColors: {
    primary: "pink",
    secondary: "#6f73d2",
    background: "#e1dee9",
    text: "#121212",
  },
  spacing: {
    xs: 3,
    sm: 6,
    md: 12,
    lg: 24,
    xl: 48,
  },
  txt: {
    xs: 10,
    md: 30,
    xl: 50,
  },
});

export { theme };
