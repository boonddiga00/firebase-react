import { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLogggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return init ? <AppRouter isLogggedIn={isLogggedIn} /> : "initializing...";
};

export default App;
