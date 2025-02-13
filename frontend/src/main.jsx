import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth-context";
import AuthLoader from "./pages/Authloader";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AuthLoader>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthLoader>
    </AuthContextProvider>
  </StrictMode>
);
