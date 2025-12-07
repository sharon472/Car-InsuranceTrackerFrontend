

import React, { useState, useEffect } from "react";

const Modal = ({ data, employees, onClose, onSave }) => {
  
  const [car, setCar] = useState(data);

  
  useEffect(() => { setCar(data); }, [data]);

  
  if (!car) return null;

  
  const handleChange = e => {
    
    const value = e.target.name === 'assigned_id' && e.target.value !== ""
      ? Number(e.target.value) 
      : e.target.value;
      
    setCar({ ...car, [e.target.name]: value });
  };
  
  
  const handleSubmit = e => { 
    e.preventDefault(); 
    onSave(car); 
    onClose(); 
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