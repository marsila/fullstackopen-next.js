"use client";

import { useActionState } from "react";
import { RegisterFormState, registerUser } from "../actions/users";
export default function RegisterPage() {
  const initialState: RegisterFormState = {
    errors: { username: "", name: "", password: "" },
    values: { username: "", name: "" },
  };
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={state?.values?.username}
          />
        </div>
        <div data-testid="username-error">
          {state?.errors?.username && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {state?.errors?.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={state?.values?.name}
          />
        </div>
        <div>
          {state?.errors?.name && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {state?.errors?.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
        </div>
        <div data-testid="passwordConfirm-error">
          {state?.errors?.password && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              {state?.errors?.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="submit-btn"
          data-testid="register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}
