import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://precapstone-backend.onrender.com",
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().register.token || getState().login.token;
      const sessionToken = window.sessionStorage.getItem("Token", token);
      if (token || sessionToken) {
        headers.set("authorization", `Bearer ${token || sessionToken}`);
      }
    },
  }),
  tagTypes: ["User"],
  endpoints: () => ({}),
});
