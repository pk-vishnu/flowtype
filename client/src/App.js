import React, { useState, useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const handleLogin = (newAccessToken) => {
    setAccessToken(newAccessToken);
    sessionStorage.setItem("accessToken", newAccessToken);
  };

  return (
    <div>{accessToken ? <Dashboard /> : <Login onLogin={handleLogin} />}</div>
  );
}

export default App;
