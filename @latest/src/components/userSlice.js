import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

// const token = useSelector((state) => state.register.token || state.login.token);
// const sessionToken = window.sessionStorage.getItem("Token");

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/api/user/users",
        method: "GET",
        // responseHandler: (response) => response.text(),
      }),
      providesTags: ["User"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/users/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/user/users/${id}`,
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
      query: ({ id }) => ({
        url: `/api/user/users/${id}`,
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
