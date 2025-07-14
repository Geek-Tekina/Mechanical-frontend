import React, { useEffect, useState } from "react";
import API from "../api";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";

const MachineManagement = () => {
  const [machines, setMachines] = useState([]);
  const [newMachine, setNewMachine] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
    serialNumber: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    status: "",
    location: "",
    serialNumber: "",
  });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchMachines = () => {
    API.get("/machines").then((res) => setMachines(res.data));
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/machines", newMachine);
    setNewMachine({
      name: "",
      description: "",
      status: "",
      location: "",
      serialNumber: "",
    });
    fetchMachines();
    showToast("Machine added successfully!");
  };

  const handleEdit = (machine) => {
    setEditId(machine._id);
    setEditData({
      name: machine.name,
      description: machine.description,
      status: machine.status,
      location: machine.location,
      serialNumber: machine.serialNumber,
    });
  };

  const handleUpdate = async (id) => {
    await API.put(`/machines/${id}`, editData);
    setEditId(null);
    fetchMachines();
    showToast("Machine updated!");
  };

  const handleDelete = async (id) => {
    await API.delete(`/machines/${id}`);
    fetchMachines();
    showToast("Machine deleted!", "error");
  };

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h3>Add New Machine</h3>
      {currentUser.role === "user" && (
        <form onSubmit={handleCreate}>
          <input
            value={newMachine.name}
            onChange={(e) =>
              setNewMachine({ ...newMachine, name: e.target.value })
            }
            placeholder="Name"
          />
          <input
            value={newMachine.description}
            onChange={(e) =>
              setNewMachine({ ...newMachine, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            value={newMachine.status}
            onChange={(e) =>
              setNewMachine({ ...newMachine, status: e.target.value })
            }
            placeholder="Status"
          />
          <input
            value={newMachine.location}
            onChange={(e) =>
              setNewMachine({ ...newMachine, location: e.target.value })
            }
            placeholder="Location"
          />
          <input
            value={newMachine.serialNumber}
            onChange={(e) =>
              setNewMachine({ ...newMachine, serialNumber: e.target.value })
            }
            placeholder="Serial Number"
          />
          <button type="submit">Add Machine</button>
        </form>
      )}

      <h3>All Machines</h3>
      <div className="machine-grid">
        {machines.map((machine) => (
          <div key={machine._id} className="machine-card-modern">
            {editId === machine._id ? (
              <div>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                <input
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                />
                <input
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                />
                <input
                  value={editData.serialNumber}
                  onChange={(e) =>
                    setEditData({ ...editData, serialNumber: e.target.value })
                  }
                />
                <button onClick={() => handleUpdate(machine._id)}>
                  Update
                </button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h4>{machine.name}</h4>
                <p>{machine.description}</p>
                <p>Status: {machine.status}</p>
                <p>Location: {machine.location}</p>
                <p>Serial: {machine.serialNumber}</p>

                {currentUser.role === "user" &&
                  machine.user === currentUser.id && (
                    <>
                      <button onClick={() => handleEdit(machine)}>Edit</button>
                      <button onClick={() => handleDelete(machine._id)}>
                        Delete
                      </button>
                    </>
                  )}

                <button onClick={() => navigate(`/machine/${machine._id}`)}>
                  View Details
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineManagement;
