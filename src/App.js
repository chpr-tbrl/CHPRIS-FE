import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout, DashLayout } from "components";
import { Toaster } from "react-hot-toast";
import Signup from "pages/signup";
import Login from "pages/login";
import Records from "pages/records";
import PasswordReset from "pages/password-reset";
import NewRecord from "pages/new-record";
import LabResults from "pages/lab-results";

function App() {
  return (
    <Fragment>
      <Toaster
        position="top-right"
        containerClassName="toast--container"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
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
            <Route path="records">
              <Route index element={<Records />} />
              <Route path="new" element={<NewRecord />} />
              <Route path="lab-results" element={<LabResults />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
