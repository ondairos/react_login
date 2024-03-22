import {
  FormData,
  SetErrorsFunctionType,
  SetCountriesFunctionType,
  SetEmailErrorFunctionType,
  SetPasswordErrorFunctionType,
} from "../components/AddressForm/AddressFormTypes";
import { loginUser } from "../state/auth/authSlice";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../state/store";
import { NavigateFunction } from "react-router-dom";

export const validateForm = (
  formData: FormData,
  setErrors: SetErrorsFunctionType
) => {
  let isValid = true;
  const formErrors: Partial<FormData> = {};
  // only letters and spaces, all unicode chars
  const lettersRegex = /^[\p{Letter}\s]+$/u;

  if (!formData.firstName.trim()) {
    [formErrors.firstName] = ["First Name is required"];
    isValid = false;
  } else if (!lettersRegex.test(formData.firstName)) {
    [formErrors.firstName] = ["First Name must contain only letters"];
    isValid = false;
  }
  if (!formData.lastName.trim()) {
    [formErrors.lastName] = ["Last Name is required"];
    isValid = false;
  } else if (!lettersRegex.test(formData.lastName)) {
    [formErrors.lastName] = ["Last Name must contain only letters"];
    isValid = false;
  }
  if (!formData.email.trim()) {
    [formErrors.email] = ["Email is required"];
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    [formErrors.email] = ["Invalid email"];
    isValid = false;
  }
  if (!formData.address.trim()) {
    [formErrors.address] = ["Address is required"];
    isValid = false;
  }
  if (!formData.country.trim()) {
    [formErrors.country] = ["Country is required"];
    isValid = false;
  }
  if (!formData.state.trim()) {
    [formErrors.state] = ["State is required"];
    isValid = false;
  }
  setErrors(formErrors);
  return isValid;
};

export const validateLoginForm = (
  email: string,
  password: string,
  setPasswordError: SetPasswordErrorFunctionType,
  setEmailError: SetEmailErrorFunctionType
): boolean => {
  let isValid = true;
  if (!email) {
    setEmailError("Email is required");
    setTimeout(() => setEmailError(""), 8000);
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError("Invalid email address");
    isValid = false;
  } else {
    setEmailError("");
  }
  if (!password) {
    setPasswordError("Password is required");
    setTimeout(() => setPasswordError(""), 8000);
    isValid = false;
  } else {
    setPasswordError("");
  }
  return isValid;
};

export const handleLoginSubmit = async (
  email: string,
  password: string,
  setPasswordError: (error: string) => void,
  setEmailError: (error: string) => void,
  dispatch: ThunkDispatch<RootState, undefined, Action>,
  navigate: NavigateFunction
) => {
  if (validateLoginForm(email, password, setPasswordError, setEmailError)) {
    try {
      const response = await dispatch(loginUser({ email, password }));
      const data = response.payload as { status: string; message: string };
      if (data.status === "success") {
        navigate("/address");
      } else {
        setEmailError(data.message);
        setTimeout(() => setEmailError(""), 8000);
      }
    } catch (error) {
      setEmailError("An error occurred");
      setTimeout(() => setEmailError(""), 8000);
    }
  }
};

export const sendToMail = (
  formData: FormData,
  setErrors: SetErrorsFunctionType
) => {
  if (validateForm(formData, setErrors)) {
    const bodyMessage = `
      First Name: ${formData.firstName}
      Last Name: ${formData.lastName}
      Address: ${formData.address}
      Email: ${formData.email}
      Country: ${formData.country}
      State: ${formData.state}
    `;

    const body = {
      subject: `${formData.firstName} ${formData.lastName}  ${formData.address}`,
      body: bodyMessage,
      emailFrom: formData.email,
      emailTo: "i-alert-test@mailinator.com",
    };
    window.location.href = `mailto:${body.emailTo}?subject=${encodeURIComponent(
      body.subject
    )}&body=${encodeURIComponent(body.body)}&from=${encodeURIComponent(
      body.emailFrom
    )}`;
  }
};

export const getCountries = async (setCountries: SetCountriesFunctionType) => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states"
    );
    const results = await response.json();
    setCountries(results.data);
  } catch (error) {
    console.log(error);
  }
};
