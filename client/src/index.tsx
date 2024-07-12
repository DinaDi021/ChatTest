import "./index.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { SocketContextProvider } from "./context/SocketContext";
import { persistor, store } from "./redux";
import { router } from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </PersistGate>
  </Provider>,
);
