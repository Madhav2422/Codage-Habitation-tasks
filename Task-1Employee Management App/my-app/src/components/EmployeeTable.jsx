import React from 'react';

const EmployeeTable = ({ employees, handleEdit, handleDelete }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Job Title</th>
          <th>Job Description</th>
          <th>Job Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.jobTitle}</td>
            <td className='description'>{employee.jobDescription}</td>
            <td>{employee.jobRole}</td>
            <td>
              <button  className='edit-button' onClick={() => handleEdit(employee.id)}>Edit</button>
              <button className='delete-button' onClick={() => handleDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
