import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Replace Switch with Routes
import { Header, NotFoundComponent } from "shared-components";
import Step2Component from "./components/Step2"; // Your custom component for Step1

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/step2" />} />
          {/* Replace Switch with Routes */}
          <Route path="/step2" element={<Step2Component />} />{" "}
          <Route path="*" element={<NotFoundComponent />} />
          {/* Replace component with element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
