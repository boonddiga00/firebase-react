import { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLogggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return init ? (
    <AppRouter isLogggedIn={isLogggedIn} userObj={userObj} />
  ) : (
    "initializing..."
  );
};

export default App;
