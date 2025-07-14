import React from "react";

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
};

export default Toast;
