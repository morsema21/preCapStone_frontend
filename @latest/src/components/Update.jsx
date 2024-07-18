import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useGetUserQuery } from "./userSlice";

export default function UpdateUser() {
  const { id } = useParams();
  const token = window.sessionStorage.getItem("Token");
  // const { data = {}, error, isLoading } = useGetUserQuery({ token, id });

  const [updateUser] = useUpdateUserMutation();
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
  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await updateUser({}).unwrap();
  //     if (response) {
  //       navigate("/api/user/users");
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUser = async (event) => {
    event.preventDefault();
    try {
      // console.log(id);
      const response = await updateUser({ token, id, form });

      if (response) {
        navigate("/home");
      }
      // console.log(response);
    } catch (error) {
      console.log("Update error");
    }
  };

  return (
    <div>
      <h1>Update user</h1>
      {/* {console.log(id)} */}
      <form onSubmit={handleUser}>
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
          Submit
        </button>
      </form>
    </div>
  );
}
