import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import { authService } from "./services/auth.service.ts";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  const user = authService.getToken();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log(token);
    if (token) {
      authService.setToken(token);
      // Optionally, you can redirect to remove the token from the URL
      window.history.replaceState({}, document.title, "/welcome");
    }
  }, [location]);

  return (
    <div className="App">
      <Routes>
      <Route path="/welcome" element={user ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
