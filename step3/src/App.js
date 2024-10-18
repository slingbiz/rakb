import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Replace Switch with Routes
import { Header, NotFoundComponent } from "shared-components";
import Step3Component from "./components/Step3"; // Your custom component for Step1

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/step3" />} />
          <Route path="/step3" element={<Step3Component />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
