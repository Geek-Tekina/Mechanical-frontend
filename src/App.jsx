import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import MachineManagement from "./components/MachineManagement";
import UserManagement from "./components/UserManagement";
import MachineDetail from "./components/MachineDetail";
import "./App.css";

const AppContent = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // 🔥 Redirect to "/" after logout
  };

  if (!user) {
    return (
      <Login
        setUser={(user) => {
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }}
      />
    );
  }

  return (
    <>
      <div className="navbar">
        <Link to="/machines">Machines</Link>
        {user.role === "admin" && <Link to="/users">Manage Users</Link>}
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Routes>
        <Route path="/machines" element={<MachineManagement />} />
        <Route path="/machine/:id" element={<MachineDetail />} />
        {user.role === "admin" && (
          <Route path="/users" element={<UserManagement />} />
        )}
        <Route
          path="/"
          element={
            <h3 style={{ textAlign: "center" }}>
              Welcome! Select an option above.
            </h3>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
