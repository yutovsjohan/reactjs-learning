import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterComponent from "./router/RouterComponent";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";

const reduxStore = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RouterComponent>
    <React.StrictMode>
      <Provider store={reduxStore} children={undefined}></Provider>
    </React.StrictMode>
  </RouterComponent>
);
