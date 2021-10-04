import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
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
    let data;
    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
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
        {newAccount ? "Create Account" : "Log In"}
      </span>
      <button onClick={onSocialClick}>Continue with Google</button>
    </div>
  );
};

export default Auth;
