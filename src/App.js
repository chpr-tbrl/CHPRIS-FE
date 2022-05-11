import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Signup from "pages/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="signup" />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
