import React from "react";
import ReactDOM from "react-dom";
import Header from "./common/Header";
import Table from "./components/Table";
import Orders from "./components/Orders";
import Employee from "./components/Employee";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
//import NotFound from "./components/notfound/NotFound";
import Detail from "./components/Detail";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Table} exact />
          <Route path="/item/:id" component={Detail} exact />
          <Route path="/current" component={Orders} exact />
          <Route path="/employees" component={Employee} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
