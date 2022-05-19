import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout, DashLayout } from "components";
import { Toaster } from "react-hot-toast";
import Signup from "pages/signup";
import Login from "pages/login";
import NotFound from "./pages/not-found";
import Records from "pages/records";
import PasswordReset from "pages/password-reset";
import NewRecord from "pages/new-record";
import LabResults from "pages/lab-results";
import FollowUp from "pages/follow-up";
import SpecimenCollection from "pages/specimen-collection";

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
              <Route path="follow-up" element={<FollowUp />} />
              <Route
                path="specimen-collection"
                element={<SpecimenCollection />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
