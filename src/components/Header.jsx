

import React from "react";

const Header = ({ onAddCar, onLogout }) => {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo">RT</div>
        <div className="titles">
          {/* UPDATED TITLE */}
          <h1>THE RESSEY TOURS AND CAR HIRE</h1>
          <p className="subtitle">Insurance Tracker — Manage fleet, drivers & reminders</p>
        </div>
      </div>
      <div className="actions">
        <input id="search" className="input search" placeholder="Search reg, model, driver..." />
        <button className="btn btn-orange" onClick={onAddCar}>+ Add Car</button>
        <button className="btn btn-outline" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;