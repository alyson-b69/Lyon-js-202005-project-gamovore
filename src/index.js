import React from "react";
import ReactDOM from "react-dom";
import Firebase from "./firebase-config/Firebase";
import FirebaseContext from "./firebase-config/FirebaseContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <UserProvider>
        <App />
      </UserProvider>
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
