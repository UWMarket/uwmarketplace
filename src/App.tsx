import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import CreateListing from "./components/CreateListing";
import Login from "./components/Login";
import routes from "tempo-routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <Home isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            }
          />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
