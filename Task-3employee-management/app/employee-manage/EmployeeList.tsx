'use client';

import { useState } from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeTable from '@/components/EmployeeTable';
import { Employee } from '@/types/Employee';



export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    setEmployees((prev) => [
      ...prev,
      { id: Date.now(), ...employeeData },
    ]);
  };

  const editEmployee = (id: number) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setEditingEmployee(employee);
    }
  };

  const updateEmployee = (updatedData: Omit<Employee, 'id'>) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee?.id ? { ...emp, ...updatedData } : emp
      )
    );
    setEditingEmployee(null);
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      <EmployeeForm
        onSubmit={editingEmployee ? updateEmployee : addEmployee}
        initialData={editingEmployee || undefined}
      />
      <EmployeeTable
        employees={employees}
        onEdit={editEmployee}
        onDelete={deleteEmployee}
      />
    </div>
  );
}
