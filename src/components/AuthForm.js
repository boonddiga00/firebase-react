import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={email}
          placeholder="Email"
          name="email"
          type="text"
          required
        />
        <input
          onChange={onChange}
          value={password}
          placeholder="password"
          name="password"
          type="password"
          required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        <span>{error}</span>
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
