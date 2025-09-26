import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServerPanelSelector from "./components/ServerPanelSelector";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ServerPanelSelector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;