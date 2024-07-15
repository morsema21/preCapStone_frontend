import Login from "./components/Login";
import Protected from "./components/Protected";
import Update from "./components/Update";
import Home from "./components/Home";
import Registration from "./components/Registration";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<Protected />}>
            <Route path="/home" element={<Home />} />
            <Route path="/update" element={<Update />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
