'use client';

import { Employee } from "../types/Employee";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
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
            <td>{employee.jobDescription}</td>
            <td>{employee.jobRole}</td>
            <td>
              <button onClick={() => onEdit(employee.id)}>Edit</button>
              <button onClick={() => onDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}