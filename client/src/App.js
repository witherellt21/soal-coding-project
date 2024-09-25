import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Authentication from "./pages/Authentication";
import Layout from "./pages/Layout";
import PageDNE from "./pages/PageDNE";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" exact Component={Authentication} />
        <Route
          exact Component={Layout}
        >
          <Route path="/" exact Component={Todos} />
          <Route path="*" exact Component={PageDNE} />
        </Route>
      </Routes>

    </Router>

  );
}

export default App;
