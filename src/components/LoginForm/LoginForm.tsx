import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../state/auth/authSlice";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/helpers";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateLoginForm(email, password, setPasswordError, setEmailError)) {
      try {
        const response = await fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: email, password: password }),
        });

        const data = await response.json();

        if (data.status === "success") {
          dispatch(loginSuccess({ email, password }));
          navigate("/address");
        } else {
          setEmailError(data.message);
          dispatch(loginFailure(data.message));
          setTimeout(() => setEmailError(""), 8000);
        }
      } catch (error) {
        setEmailError("An error occurred");
        dispatch(loginFailure("An error occurred"));
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
