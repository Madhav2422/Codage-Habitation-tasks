'use client';

import { useState } from 'react';
import { Employee } from '@/types/Employee';

interface EmployeeFormProps {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  initialData?: Omit<Employee, 'id'>;
}

export default function EmployeeForm({ onSubmit, initialData }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(
    initialData || {
      firstName: '',
      lastName: '',
      jobTitle: '',
      jobDescription: '',
      jobRole: '',
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      jobTitle: '',
      jobDescription: '',
      jobRole: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="jobDescription"
        placeholder="Job Description"
        value={formData.jobDescription}
        onChange={handleInputChange}
        required
      ></textarea>
      <input
        type="text"
        name="jobRole"
        placeholder="Job Role"
        value={formData.jobRole}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}