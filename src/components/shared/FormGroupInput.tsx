import React from "react";
import "../../css/LoginForm.css";
import { FormGroupProps } from "../AddressForm/AddressFormTypes";

export const FormGroupInput: React.FC<FormGroupProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  handleChange,
}: FormGroupProps) => {
  return (
    <div className="formGroup">
      <label htmlFor={label}>{label}:</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
