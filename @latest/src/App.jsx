import Account from "./components/Account/Account";
import Books from "./components/Home/Books";
import Login from "./components/Login/Login";
import Navigations from "./components/Home/Navigations";
import Register from "./components/Register/Register";
import SingleBook from "./components/Home/SingleBook";
import Protected from "./components/Protected";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//TODO fix this to be current

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/account" element={<Protected />}>
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
