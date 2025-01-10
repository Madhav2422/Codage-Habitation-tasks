import React from 'react';

const EmployeeForm = ({ formData, handleChange, handleSubmit,isEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        required
      />
      <textarea
        name="jobDescription"
        placeholder="Job Description"
        value={formData.jobDescription}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="jobRole"
        placeholder="Job Role"
        value={formData.jobRole}
        onChange={handleChange}
      />
     <button
        type="submit"
        className={isEditing ? "save-button" : "add-button"}
      >
        {isEditing ? "Save" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
