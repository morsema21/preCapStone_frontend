import { useEffect, useState } from "react";
import { useLoginMutation } from "./loginSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ setEmail }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  // const [userId, setUserId] = useState();
  const [login] = useLoginMutation();

  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let success = await login(inputFields).unwrap();
      const successJson = JSON.parse(success);
      console.log("test:", successJson.token);
      if (success) {
        // setUserId(success)
        setEmail(successJson.token.email);
        navigate(`/home`);
        console.log(successJson.token.email);
      }
      // document.getElementById("login-form").reset();
      // document.getElementById("successful").innerText = success.message;
    } catch (error) {
      console.log(error);
      document.getElementById("successful").innerText =
        "Please complete all fields";
    }
  };

  return (
    <div id="form-group">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id="form-group">
        <label>
          Email: <input name="email" type="email" onChange={handleChange} />
        </label>
        <label>
          Password:{" "}
          <input name="password" type="password" onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
        <h3 id="successful"></h3>
      </form>
    </div>
  );
};

export default Login;
