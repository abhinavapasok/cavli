import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./componets/Navbar";
import ViewDetails from "./pages/ViewDetails";
import GraphPage from "./pages/GraphPage";
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-details" element={<ViewDetails />} />
        <Route path="/view-graph" element={<GraphPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
