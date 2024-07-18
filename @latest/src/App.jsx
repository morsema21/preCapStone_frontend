import Login from "./components/Login";
import Protected from "./components/Protected";
import UpdateUser from "./components/Update";
import Home from "./components/Home";
import Registration from "./components/Registration";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [email, setEmail] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setEmail={setEmail} />} />
          <Route
            path="/register"
            element={<Registration setEmail={setEmail} />}
          />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home email={email} />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
