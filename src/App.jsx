

import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CarsTable from "./components/CarsTable.jsx";
import EmployeesTable from "./components/EmployeesTable.jsx";
import ActivityLog from "./components/ActivityLog.jsx";
import Modal from "./components/Modal.jsx";
import LoginScreen from "./components/LoginScreen.jsx"; 

import { addCar, updateCar, deleteCar } from "./services/api.js";


const initialCars = [
  { id: 101, plate_number: "KCL 001", model: "Toyota Prado", assigned_id: 1, insurance_due: "2026-10-01", notes: "Executive car" },
  { id: 102, plate_number: "KDL 002", model: "Nissan Patrol", assigned_id: 2, insurance_due: "2025-01-15", notes: "Needs tire rotation" },
  { id: 103, plate_number: "KML 003", model: "Subaru Outback", assigned_id: 3, insurance_due: "2026-05-20", notes: "Recently serviced" },
  { id: 104, plate_number: "KGL 104", model: "Mazda CX-5", assigned_id: 1, insurance_due: "2024-12-10", notes: "Renewal urgent" },
  { id: 105, plate_number: "KFH 505", model: "Mercedes C200", assigned_id: null, insurance_due: "2025-03-25", notes: "Executive sedan" },
  { id: 106, plate_number: "KJK 606", model: "Land Rover Discovery", assigned_id: 2, insurance_due: "2024-11-05", notes: "Off-road capable" },
  { id: 107, plate_number: "KLP 707", model: "Toyota Voxy", assigned_id: 3, insurance_due: "2026-07-30", notes: "For airport transfers" },
  { id: 108, plate_number: "KRM 808", model: "Hyundai Tucson", assigned_id: null, insurance_due: "2025-08-10", notes: "New lease" },
  { id: 109, plate_number: "KNS 909", model: "Honda CRV", assigned_id: 1, insurance_due: "2025-04-18", notes: "Maintenance done" },
  { id: 110, plate_number: "KTT 110", model: "BMW X5", assigned_id: 2, insurance_due: "2026-01-01", notes: "Premium SUV" },
];

const App = () => {
  
  const [cars, setCars] = useState(initialCars); 
  const [insurances, setInsurances] = useState([]);
  
  const [employees] = useState([
    { id: 1, name: 'John Mwangi', role: 'Driver', phone: '+254700111222' },
    { id: 2, name: 'Grace Njeri', role: 'Admin', phone: '+254700222333' },
    { id: 3, name: 'Peter Otieno', role: 'Mechanic', phone: '+254700333444' },
  ]);

  const [log, setLog] = useState([]);
  const [modalData, setModalData] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  

  const handleAddCar = async (car) => {
    try {
      
      const saved = await addCar(car);
      setCars([...cars, saved]);
      setLog([{ 
          id: Date.now(), 
          title: "Car added", 
          msg: `New car ${saved.plate_number} added. (Backend synced)`, 
          ts: Date.now() 
      }, ...log]);
    } catch (err) {
       
       const newCarId = Math.max(...cars.map(c => c.id)) + 1;
       const simulatedCar = { ...car, id: newCarId };
       setCars([...cars, simulatedCar]);
       setLog([{ 
          id: Date.now(), 
          title: "Car added (Local Only)", 
          msg: `New car ${car.plate_number} added locally. Backend failed.`, 
          ts: Date.now() 
      }, ...log]);
      console.warn("API add failed. Car added to local state only.", err);
    }
  };

  const handleUpdateCar = async (car) => {
    try {
      const updated = await updateCar(car.id, car);
      setCars(cars.map(c => c.id === car.id ? updated : c));
      setLog([{ 
          id: Date.now(), 
          title: "Car updated", 
          msg: `Car ${updated.plate_number} details updated. (Backend synced)`, 
          ts: Date.now() 
      }, ...log]);
    } catch (err) {
      
      setCars(cars.map(c => c.id === car.id ? car : c));
      setLog([{ 
          id: Date.now(), 
          title: "Car updated (Local Only)", 
          msg: `Car ${car.plate_number} updated locally. Backend failed.`, 
          ts: Date.now() 
      }, ...log]);
      console.warn("API update failed. Car updated to local state only.", err);
    }
  };
  
  const handleDeleteCar = async (carId, plateNumber) => {
    if (!window.confirm(`Are you sure you want to delete car ${plateNumber}?`)) return;
    
    try {
      await deleteCar(carId);
      
      setCars(cars.filter(c => c.id !== carId));
      setLog([{ 
          id: Date.now(), 
          title: "Car deleted", 
          msg: `Car ${plateNumber} successfully removed.`, 
          ts: Date.now() 
      }, ...log]);
    } catch (err) {
      
      setCars(cars.filter(c => c.id !== carId));
      setLog([{ 
          id: Date.now(), 
          title: "Car deleted (Backend Fail)", 
          msg: `Car ${plateNumber} removed locally, but API delete failed.`, 
          ts: Date.now() 
      }, ...log]);
      console.error(err);
    }
  };

  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLog([{ 
        id: Date.now(), 
        title: "User Logout", 
        msg: `Admin user logged out at ${new Date().toLocaleTimeString()}.`, 
        ts: Date.now() 
    }, ...log]);
  };

  const handleLogin = () => {
      setIsAuthenticated(true);
      //Removed API load calls
      setLog([{ 
          id: Date.now(), 
          title: "User Login", 
          msg: `Admin user successfully logged in at ${new Date().toLocaleTimeString()}.`, 
          ts: Date.now() 
      }]);
  };
  
  
  if (!isAuthenticated) {
      return <LoginScreen onLogin={handleLogin} />;
  }
  
  return (
    <div className="container">
      <Header onAddCar={() => setModalData({})} onLogout={handleLogout} />
      <Dashboard cars={cars} employees={employees} />
      <section className="grid">
        <CarsTable
          cars={cars}
          employees={employees}
          onEdit={car => setModalData(car)}
          onDelete={handleDeleteCar} 
        />
        <EmployeesTable employees={employees} cars={cars} />
      </section>
      <ActivityLog log={log} />
      {modalData && (
        <Modal
          data={modalData}
          employees={employees}
          onClose={() => setModalData(null)}
          onSave={modalData.id ? handleUpdateCar : handleAddCar}
        />
      )}
    </div>
  );
};

export default App;