import ReactDOM from "react-dom";
import "./index.css";
import View from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./Themes/Theme";
import CssBaseline from "@mui/material/CssBaseline";

import { Provider } from "react-redux";
import store from "./Store/store";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <View />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

