import Login from "./components/Login";
import Protected from "./components/Protected";
import UpdateUser from "./components/Update";
import Home from "./components/Home";
import Registration from "./components/Registration";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login userId={userId} setUserId={setUserId}/>} />
          <Route path="/register" element={<Registration setUserId={setUserId}/>} />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home userId={userId} />} />
            <Route path="/update/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
