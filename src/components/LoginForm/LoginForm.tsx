import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { handleLoginSubmit } from "../../utils/helpers";
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
    handleLoginSubmit(
      email,
      password,
      setPasswordError,
      setEmailError,
      dispatch,
      navigate
    );
  };

  return (
    <>
      <Header />
      <section>
        {(emailError || passwordError) && (
          <ul className="alert">
            {emailError && <li>{emailError}</li>}
            {passwordError && <li>{passwordError}</li>}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <h5 className="description">
            Please use your credentials to login:{" "}
          </h5>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              placeholder="type your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="type your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};
