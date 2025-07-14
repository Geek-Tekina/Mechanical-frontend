import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const MachineDetail = () => {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);

  useEffect(() => {
    API.get(`/machines/${id}`).then((res) => setMachine(res.data));
  }, [id]);

  if (!machine) return <div>Loading...</div>;

  return (
    <div className="machine-detail-page">
      <h2>{machine.name}</h2>
      <p>
        <strong>Description:</strong> {machine.description}
      </p>
      <p>
        <strong>Status:</strong> {machine.status}
      </p>
      <p>
        <strong>Location:</strong> {machine.location}
      </p>
    </div>
  );
};

export default MachineDetail;
