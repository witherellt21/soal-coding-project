import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import PageDNE from "./pages/PageDNE";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact Component={Layout}>
            <Route index exact Component={Login} />
            <Route path="signup" exact Component={Signup} />
            <Route path="todos" exact Component={Todos} />
            <Route path="*" exact Component={PageDNE} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
