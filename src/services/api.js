// frontend/src/services/api.js
const API_URL = "http://127.0.0.1:8000";


export const fetchCars = async () => {
  const res = await fetch(`${API_URL}/cars`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const addCar = async (car) => {
  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  if (!res.ok) throw new Error(`Failed to add car: ${res.statusText}`);
  return res.json();
};

export const updateCar = async (id, car) => {
  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  });
  if (!res.ok) throw new Error(`Failed to update car: ${res.statusText}`);
  return res.json();
};

export const deleteCar = async (id) => {
  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
  });
  
  if (!res.ok && res.status !== 204) throw new Error(`Failed to delete car: ${res.statusText}`);
  return;
};


export const fetchInsurances = async () => {
  
  return []; 
};


export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) {
    // If login fails, try to parse the error message from the backend
    const error = await res.json();
    throw new Error(error.detail || "Login failed. Check username and password.");
  }
  
  return res.json();
};