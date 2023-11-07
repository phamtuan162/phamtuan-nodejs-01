import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./core/Provider.jsx";
import "./assets/scss/main.scss";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

console.log(domain, clientId);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <Auth0Provider
        domain={"dev-mege05szr5ba0ouu.us.auth0.com"}
        clientId={"3sIOwrmwmgXXT2kW1SjWy2ZWjiG1mkRp"}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
