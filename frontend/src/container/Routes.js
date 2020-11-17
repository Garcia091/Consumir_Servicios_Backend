import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login'
import Menu from '../components/Menu'
import Registro from '../components/Registro'
import Carros from '../components/Carros'
export default function Router() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/menu" component={Menu}/>
            <Route exact path="/registro" component={Registro}/>
            <Route exact path="/app" component={Carros}/>
        </Switch>
  </BrowserRouter>
  );
}
