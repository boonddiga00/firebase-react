import React from "react";
import { authService, firebaseInstance } from "../fbase";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };
  return (
    <div>
      <AuthForm />
      <button onClick={onSocialClick}>Continue with Google</button>
    </div>
  );
};

export default Auth;
