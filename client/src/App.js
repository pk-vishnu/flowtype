import Login from "./Login";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <>
      <Navbar />
      {code ? <Dashboard code={code} /> : <Login />}
    </>
  );
}

export default App;
