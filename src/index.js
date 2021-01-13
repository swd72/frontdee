import React from "react";
import ReactDOM from "react-dom";
import "./fonts/Kanit-Light.ttf";
import "./fonts/Kanit-Medium.ttf";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createStore } from "redux";
import { Provider } from "react-redux";
import MyReducer from "./reducer/MyReducer";

const store = createStore(MyReducer, {
  token: {},
});

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Kanit-Light"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={THEME}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
