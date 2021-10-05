import { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  return init ? (
    <AppRouter isLogggedIn={userObj} userObj={userObj} />
  ) : (
    "initializing..."
  );
};

export default App;
