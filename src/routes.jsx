import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import MapPage from "pages/Map";
import HomePage from "pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/map" component={MapPage}  />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
