import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login'
import Menu from '../components/Menu'
import Registro from '../components/Registro'
import Carros from '../components/Carros'
import Frutas from '../components/Frutas'
import FrutaDB from '../components/FrutaDB'
import Rutina from '../components/Rutina'


export default function Router() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/menu" component={Menu}/>
            <Route exact path="/registro" component={Registro}/>
            <Route exact path="/app" component={Carros}/>
            <Route exact path="/fruta" component={Frutas}/>
            <Route exact path="/base" component={FrutaDB}/>
            <Route exact path="/rutina" component={Rutina}/>
        </Switch>
  </BrowserRouter>
  );
}
