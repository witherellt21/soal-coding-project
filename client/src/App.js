import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import AuthenticationLayout from "./pages/AuthenticationLayout";
import Layout from "./pages/Layout";
import PageDNE from "./pages/PageDNE";

function App() {
  return (
    <Router>
      <div className="h-screen w-screen">
        <Routes>
          <Route path="/" exact Component={Layout}>
            <Route index exact Component={AuthenticationLayout} />
            <Route path="todos" exact Component={Todos} />
            <Route path="*" exact Component={PageDNE} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
