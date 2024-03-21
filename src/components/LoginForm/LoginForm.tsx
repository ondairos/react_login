import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/helpers";
import { loginUser } from "../../state/auth/authSlice";
import { AppDispatch } from "../../state/store";
import "../../css/LoginForm.css";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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

  return (
    <>
      <Header />
      <section className="mt-10">
        {emailError && <div>{emailError}</div>}
        {passwordError && <div>{passwordError}</div>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};
