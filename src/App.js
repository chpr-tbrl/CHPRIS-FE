import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout, DashLayout } from "components";
import Signup from "pages/signup";
import Login from "pages/login";
import Records from "pages/records";
import PasswordReset from "pages/password-reset";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="password-reset" element={<PasswordReset />} />
          </Route>

          <Route path="/dashboard" element={<DashLayout />}>
            <Route index element={<Navigate to="records" />} />
            <Route path="records" element={<Records />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
