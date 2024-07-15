import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/api/user/users",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/user/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/api/user/users/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: {
          firstName: "",
          LastName: "",
          email: "",
          password: "",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const userSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getUsers.matchFulFilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default userSlice.reducer;

export const { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = userApi;
