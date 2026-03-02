import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.register();