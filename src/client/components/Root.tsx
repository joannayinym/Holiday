import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import { Provider } from "react-redux";
// import { store } from "./Store";

export default () => {
  return (
    // <Provider store={store}>
    <Router>
      <App />
    </Router>
    // </Provider>
  );
};
