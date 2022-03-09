import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {

    const isAdminAuthenticated = localStorage.getItem("adminToken");  
    return (
      <Route
        {...restOfProps}
        render={(props) =>
            isAdminAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }

export default ProtectedRoute;