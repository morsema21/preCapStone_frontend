import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = () => {
  const token = useSelector((state) => state.login.token);

  if (!token) {
    return <Navigate to="login" />;
  }

  return <Outlet />;
};

export default Protected;
