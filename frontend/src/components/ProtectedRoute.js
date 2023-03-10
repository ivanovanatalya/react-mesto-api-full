// ProtectedRoute.js

import React from "react";
import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ children, path, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn ? (children) : (<Redirect to="/sign-in" />)
      }
    />
  );
};

export default ProtectedRoute; 