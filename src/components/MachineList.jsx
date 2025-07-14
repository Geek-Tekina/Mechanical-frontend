import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api";

export const MachineList = () => {
  const [machines, setMachines] = useState([]);

  const fetchMachines = () => {
    API.get("/machines").then((res) => setMachines(res.data));
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/machines/${id}`);
    fetchMachines();
  };

  return (
    <div>
      <h3>Machines</h3>
      {machines.map((m) => (
        <div className="machine-card" key={m._id}>
          <Link to={`/machine/${m._id}`}>{m.name}</Link>
          <button
            onClick={() => handleDelete(m._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export const MachineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
  });

  useEffect(() => {
    API.get(`/machines/${id}`).then((res) => {
      setMachine(res.data);
      setEditData(res.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await API.put(`/machines/${id}`, editData);
    navigate("/");
  };

  if (!machine) return <div>Loading...</div>;

  return (
    <div className="machine-card">
      <h3>{machine.name} Details</h3>
      <p>Description: {machine.description}</p>
      <p>Status: {machine.status}</p>
      <p>Location: {machine.location}</p>

      <h4>Edit Machine</h4>
      <form onSubmit={handleUpdate}>
        <input
          value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          value={editData.description}
          onChange={(e) =>
            setEditData({ ...editData, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          value={editData.status}
          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          placeholder="Status"
        />
        <input
          value={editData.location}
          onChange={(e) =>
            setEditData({ ...editData, location: e.target.value })
          }
          placeholder="Location"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
