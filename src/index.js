/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "components/Login";
import ProtectedRoute from "components/ProtectedRoute";
import SubAdminProtectedRoute from "components/SubAdminProtectedRoute";
// core components
import Admin from "layouts/Admin";
import SubAdmin from "layouts/SubAdmin"
import Error from "components/Error";
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer/>
    <Switch>
      <Route exact path="/" component={Login} />
      <ProtectedRoute path="/admin" component={Admin} />
      <SubAdminProtectedRoute path="/subadmin" component={SubAdmin} />
      {/* <Route from="/" to="/admin"/> */}
      {/* <Redirect from="/" to="/subadmin" /> */}
      <Route path="/rtl" component={RTL} />
      <Route component={Error}/>
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
