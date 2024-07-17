import Login from "./components/Login";
import Protected from "./components/Protected";
import UpdateUser from "./components/Update";
import Home from "./components/Home";
import Registration from "./components/Registration";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home token={token} />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
