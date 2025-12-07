import React from "react";

const EmployeesTable = ({ employees, cars }) => {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Employees</h2>
      </div>
      <div className="table-wrap small">
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Role</th><th>Assigned</th><th>Phone</th></tr>
          </thead>
          <tbody>
            {employees.map(emp => {
              const assigned = cars.filter(c => c.assigned === emp.id).length;
              return (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{assigned}</td>
                  <td>{emp.phone || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;
