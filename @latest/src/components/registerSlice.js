import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/register",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      registerApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload;
        window.sessionStorage.setItem("Token", payload);
      }
    );
  },
});

export default registerSlice.reducer;

export const { useRegisterMutation } = registerApi;
