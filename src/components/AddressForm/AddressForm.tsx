import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, Country, State, FormData } from "./AddressFormTypes.ts";
import { getCountries, sendToMail } from "../../utils/helpers.ts";
import "../../css/LoginForm.css";
import { FormGroupInput } from "../shared/FormGroupInput/FormGroupInput.tsx";
import formGroupInputs from "../shared/FormGroupInput/FormGroupInputData.ts";

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
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

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

      {Object.keys(errors).length > 0 && (
        <ul className="alert">
          {Object.values(errors).map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <h5 className="description">Fill out your information:</h5>
        {formGroupInputs.map((group, index) => (
          <FormGroupInput
            key={index}
            label={group.label}
            name={group.name}
            type={group.type}
            placeholder={group.placeholder}
            value={formData[group.name]}
            handleChange={handleChange}
          />
        ))}

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

        <button type="submit">Submit to Email</button>
      </form>
    </>
  );
};
