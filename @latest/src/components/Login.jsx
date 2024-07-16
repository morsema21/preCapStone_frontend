import { useEffect, useState } from "react";
import { useLoginMutation } from "./loginSlice";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();

  const handleChange = (e) => {
    setInputFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let success = await login(inputFields).unwrap();
      document.getElementById("login-form").reset();
      document.getElementById("successful").innerText = success.message;
    } catch (error) {
      console.log(error);
      document.getElementById("successful").innerText =
        "Please complete all fields";
    }
  };

  return (
    <div id="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} id="login-form">
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
