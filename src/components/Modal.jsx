// frontend/src/components/Modal.jsx

import React, { useState, useEffect } from "react";

const Modal = ({ data, employees, onClose, onSave }) => {
  // Initialize state with the car data passed in (data is an empty object for 'Add Car')
  const [car, setCar] = useState(data);

  // Synchronize internal state when the parent component passes new data (e.g., when clicking 'Edit')
  useEffect(() => { setCar(data); }, [data]);

  // Don't render if no car data is available
  if (!car) return null;

  // Handles updates to all input fields
  const handleChange = e => {
    // Convert the assigned_id value to a number if it's not the empty string
    const value = e.target.name === 'assigned_id' && e.target.value !== ""
      ? Number(e.target.value) 
      : e.target.value;
      
    setCar({ ...car, [e.target.name]: value });
  };
  
  // Handles form submission, calling the onSave handler from App.jsx
  const handleSubmit = e => { 
    e.preventDefault(); 
    onSave(car); 
    onClose(); // Automatically close the modal after saving
  };

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-card">
        <header className="modal-head">
          {/* Title changes based on whether a car ID exists */}
          <h3>{car.id ? "Edit Car" : "Add New Car"}</h3>
          <button className="btn btn-clear" onClick={onClose}>✕</button>
        </header>
        <form onSubmit={handleSubmit}>
          
          <div className="row">
            <label>Registration Plate Number</label>
            <input 
              className="input" 
              name="plate_number" 
              value={car.plate_number || ""} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="row two">
            <div>
              <label>Model</label>
              <input 
                className="input" 
                name="model" 
                value={car.model || ""} 
                onChange={handleChange} 
                required
              />
            </div>
            <div>
              <label>Assign to Driver/User</label>
              <select
                className="input"
                name="assigned_id"
                // Use car.assigned_id or an empty string for the default "-- Unassigned --" option
                value={car.assigned_id || ""}
                onChange={handleChange}
              >
                <option value="">-- Unassigned --</option>
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} ({e.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="row">
            <label>Insurance Due Date</label>
            <input 
              className="input" 
              type="date" 
              name="insurance_due" 
              value={car.insurance_due || ""} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="row">
            <label>Notes</label>
            <textarea 
              className="input" 
              rows={3} 
              name="notes" 
              value={car.notes || ""} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="row actions-row">
            <button className="btn btn-orange" type="submit">Save</button>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;