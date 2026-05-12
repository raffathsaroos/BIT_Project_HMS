/*import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
	
	<div>
	
	<Login />
	
	</div>
	
  );
}

export default App;*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"; // Home-ஐயும் Import செய்ய வேண்டும்

function App() {
  return (
    <Router>
      <Routes>
	    {/* ஆரம்பத்தில் லாகின் பக்கம் தெரிய path="/" என வைக்கலாம் */}
        <Route path="/" element={<Login />} />
        
        {/* ஹோம் பக்கத்திற்கான பாதை */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;