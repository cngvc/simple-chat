import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import route from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <RouterProvider router={route} />
        </Container>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
