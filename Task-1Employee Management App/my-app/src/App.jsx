import React, { useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    jobDescription: "",
    jobRole: "",
  });
  const [editId, setEditId] = useState(null); // New state to track edit mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      jobDescription: formData.jobDescription.trim() || "-", // Default to '-' if empty
      jobRole: formData.jobRole.trim() || "-", // Default to '-' if empty
    };
  
    if (editId) {
      // Update existing employee
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editId ? { ...updatedFormData, id: editId } : employee
        )
      );
      setEditId(null);
    } else {
      // Add new employee
      setEmployees([...employees, { ...updatedFormData, id: Date.now() }]);
    }
  
    // Reset form fields
    setFormData({
      firstName: "",
      lastName: "",
      jobTitle: "",
      jobDescription: "",
      jobRole: "",
    });
  };
  
  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setFormData(employeeToEdit);
    setEditId(id); // Set edit mode
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      <EmployeeForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={!!editId} // Pass edit state
      />
      <EmployeeTable
        employees={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
