import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import FormField from "./FormField";

const defaultUserData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
};

const EditUserModal = ({ show, onClose, userData, onSubmit }) => {
  const [formData, setFormData] = useState(defaultUserData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        password: "",
      });
    }
  }, [userData]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("one special character");
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name && !formData.last_name) {
      newErrors.first_name = "First or last name is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (formData.password) {
      const pwErrors = validatePassword(formData.password);
      if (pwErrors.length > 0) {
        newErrors.password =
          "Password must contain: " + pwErrors.join(", ") + ".";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Only include password if filled
    const submitData = { ...formData };
    if (!submitData.password) {
      delete submitData.password;
    }
    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(defaultUserData);
    setErrors({});
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Edit Owner Info">
      <form onSubmit={handleSubmit}>
        <FormField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.first_name}
        />
        <FormField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <FormField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormField
          label="Password (leave blank to keep unchanged)"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Save Info
        </button>
      </form>
    </BaseModal>
  );
};

export default EditUserModal;
