import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { css } from "@emotion/core";

ReactDOM.render(
  <BrowserRouter>
    <ColorModeScript />
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

reportWebVitals();
