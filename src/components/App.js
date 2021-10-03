import { useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

const App = () => {
  const [isLogggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <AppRouter isLogggedIn={isLogggedIn} />;
};

export default App;
