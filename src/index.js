import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import authProvider from "./provider/authProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

ReactDOM.render(
    <BrowserRouter>
        <authProvider>
            <App />
        </authProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.register();