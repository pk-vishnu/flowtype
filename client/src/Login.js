import React from "react";

import useAuth from "./useAuth";

export default function Login() {
  const { login } = useAuth();
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}
