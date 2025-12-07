import React from "react";

const CarsTable = ({ cars, employees, onEdit, onDelete }) => {
  // Finds employee name based on assigned_id
  const getEmpName = (id) =>
    employees.find((e) => e.id === id)?.name || "Unassigned";

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Fleet</h2>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Reg</th>
              <th>Model</th>
              <th>Driver</th>
              <th>Insurance Due</th>
              <th>Days</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => {
              // 🚨 FIX: ONLY use car.assigned_id. The check for 'car.assigned' was the source of the crash.
              const driverId = car.assigned_id; 
              
              const due = car.insurance_due
                ? new Date(car.insurance_due)
                : null;
              
              const days = due
                ? Math.ceil(
                    (due - new Date()) / (1000 * 60 * 60 * 24)
                  )
                : "-";

              let daysStyle = {};
              if (days < 0) {
                daysStyle = { color: "red", fontWeight: "bold" };
              } else if (days <= 60) {
                daysStyle = { color: "orange", fontWeight: "bold" };
              }

              return (
                <tr key={car.id}>
                  <td>{car.plate_number}</td>
                  <td>{car.model}</td>
                  {/* Now correctly passing driverId to getEmpName */}
                  <td>{getEmpName(driverId)}</td> 
                  <td>{car.insurance_due || "-"}</td>
                  <td style={daysStyle}>
                    {days >= 0 ? `${days} days` : "Expired"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline small"
                      onClick={() => onEdit(car)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-red small"
                      onClick={() => onDelete(car.id, car.plate_number)}
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {cars.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                  No cars available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarsTable;
