import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterComponent from "./router/RouterComponent";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterComponent>
      <React.StrictMode></React.StrictMode>
    </RouterComponent>
  </Provider>
);
