import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, Country, State, FormData } from "./AddressFormTypes.ts";
import { getCountries, sendToMail } from "../../utils/helpers.ts";
import "../../css/LoginForm.css";

export const AddressForm: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const emailFromState =
    useSelector((state: RootState) => state.auth.email) ?? "";
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: emailFromState,
    address: "",
    country: "",
    state: "",
  });

  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: emailFromState,
    }));
  }, [emailFromState]);

  useEffect(() => {
    getCountries(setCountries);
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dataForSelectedCountry = countries.find(
      (country) => country.name === event.target.value
    );
    setFormData({ ...formData, country: event.target.value });
    setStates(dataForSelectedCountry?.states || []);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    sendToMail(formData, setErrors);
  };

  return (
    <>
      <h1 className="userHeading">Hello: {formData.email.split("@")[0]}</h1>
      <h1 className="description">Fill out your information:</h1>

      {Object.keys(errors).length > 0 && (
        <ul>
          {Object.values(errors).map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.iso3} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.length === 0 && <option value="No State">No State</option>}
            {states.map((state) => (
              <option key={state.state_code} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
