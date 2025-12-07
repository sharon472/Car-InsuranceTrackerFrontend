import React from "react";

const Dashboard = ({ cars, employees }) => {
  const assignedCars = cars.filter(c => c.admin_id).length;
  const dueSoon = cars.filter(c => {
    if(!c.insurance_due) return false;
    const due = new Date(c.insurance_due);
    const now = new Date();
    const diff = (due - now) / (1000*60*60*24);
    return diff >=0 && diff <= 30;
  }).length;

  return (
    <section className="dashboard">
      <div className="card stat">
        <div className="label">Total Cars</div>
        <div className="big">{cars.length}</div>
      </div>
      <div className="card stat">
        <div className="label">Insurances due (30d)</div>
        <div className="big">{dueSoon}</div>
      </div>
      <div className="card stat">
        <div className="label">Total Employees</div>
        <div className="big">{employees.length}</div>
      </div>
      <div className="card stat">
        <div className="label">Assigned Cars</div>
        <div className="big">{assignedCars}</div>
      </div>
    </section>
  );
};

export default Dashboard;
