import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Replace Switch with Routes
import { Header, NotFoundComponent } from "shared-components";
import Step1Component from "./components/Step1"; // Your custom component for Step1

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {" "}
          {/* Replace Switch with Routes */}
          {/* Default route redirects to /step1 */}
          <Route path="/" element={<Navigate to="/step1" />} />
          <Route path="/step1" element={<Step1Component />} />{" "}
          <Route path="*" element={<NotFoundComponent />} />
          {/* Replace component with element */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
