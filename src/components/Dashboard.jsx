import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  return (
    <div>
      <h3>
        Welcome, {user.name} ({user.role})
      </h3>
      <nav>
        <Link to="/">Machines</Link> |{" "}
        {user.role === "admin" && <Link to="/users">Manage Users</Link>}
      </nav>
    </div>
  );
};

export default Dashboard;
