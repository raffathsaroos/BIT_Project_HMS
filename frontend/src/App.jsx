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
import Signup from './pages/Signup';
import Home from "./pages/Home"; 

function App() {
  return (
    <Router>
      <Routes>
	    
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
		<Route path="/" element={<Login />} />
		
      </Routes>
    </Router>
  );
}

export default App;