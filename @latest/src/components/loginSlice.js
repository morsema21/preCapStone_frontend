import { useState } from "react";
import { api } from "../app/api";
import { createSlice } from "@reduxjs/toolkit";

const TOKEN = "Token";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/login",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

function storeToken(state, { payload }) {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN, payload.token);
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(loginApi.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;

export const { useLoginMutation } = loginApi;
