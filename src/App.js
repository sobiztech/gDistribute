import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import Test from "./pages/test/Test";
import WithLayout from "./WithLayouts";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/">
          <WithLayout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
