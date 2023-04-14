import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./components/header";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import NotFound from "./pages/404";
import Buy from "./pages/buy";
import Purchases from "./pages/purchases";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/buy" component={Buy} />
      <Route path="/purchases" component={Purchases} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
