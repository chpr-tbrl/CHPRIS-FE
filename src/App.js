import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Layout } from "components";
import Signup from "pages/signup";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="signup" />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
