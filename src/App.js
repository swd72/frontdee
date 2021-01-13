import React, { useState } from "react";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import ProviderRoot from "./provider";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});
function App() {
  const [progress, setProgress] = useState(50);
  return (
    <Router history={browserHistory} className="App">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ProviderRoot />
    </Router>
  );
}

export default App;
