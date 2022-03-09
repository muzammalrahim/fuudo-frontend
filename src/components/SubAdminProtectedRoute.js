import React from "react";
import { Redirect, Route } from "react-router-dom";

function SubAdminProtectedRoute({ component: Component, ...restOfProps }) {

    const isSubAdminAuthenticated = localStorage.getItem("subAdminToken");
      
    return (
      <Route
        {...restOfProps}
        render={(props) =>
            isSubAdminAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }

export default SubAdminProtectedRoute;