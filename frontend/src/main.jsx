import React from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { useEffect } from "react";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
  // cookieSecure: window.location.protocol === 'https:',
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
