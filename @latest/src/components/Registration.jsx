import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./registerSlice";

export default function Register({ setUserId }) {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
  });
  

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await registerUser(form).unwrap();
      console.log("test:", success);
      if (success) {
        navigate("/home");
        console.log(success);
      }
    } catch (error) {
      console.log(error, "hello");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            name="LastName"
            value={form.LastName}
            onChange={update}
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            name="email"
            value={form.email}
            onChange={update}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            className="form-control"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
