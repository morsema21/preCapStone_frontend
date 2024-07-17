import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";
import { useSelector } from "react-redux";

// const token = useSelector((state) => state.register.token || state.login.token);
// const sessionToken = window.sessionStorage.getItem("Token");

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (token) => ({
        url: "/api/user/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        // responseHandler: (response) => response.text(),
      }),
      providesTags: ["User"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/user/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ token, id, form }) => ({
        url: `/api/user/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: {
          firstName: form.firstName,
          LastName: form.LastName,
          email: form.email,
          password: form.password,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: ({ token, id }) => ({
        url: `/api/user/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        // responseHandler: (response) => response.text(),
      }),
      providesTags: ["User"],
    }),
  }),
});

const userSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default userSlice.reducer;

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} = userApi;
