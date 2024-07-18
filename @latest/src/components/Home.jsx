import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home({ email }) {
  // const { userId } = useParams();
  const [users, getUser] = useState([]);
  const { data, isSuccess, isLoading } = useGetUsersQuery();
  // const { data: user } = useGetUserQuery();
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      getUser(data);
    }
  }, [data, isSuccess]);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleDelete = async (event, id, userEmail) => {
    event.preventDefault();
    try {
      console.log(id);
      console.log(email);
      console.log(userEmail);
      // console.log(user.email);
      if (email !== userEmail) {
        const response = await deleteUser({ id });
        getUser((users) => users.filter((user) => user.id !== id));
      } else {
        return alert("cannot delete logged in user");
      }
    } catch (error) {
      console.log("Delete error");
    }
  };

  return (
    <div>
      {isSuccess &&
        users.map((user) => {
          return (
            <p key={user.id}>
              {user.email}{" "}
              <button
                onClick={(event) => handleDelete(event, user.id, user.email)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/update/${user.id}`)}
                className="btn btn-danger"
              >
                Update
              </button>
            </p>
          );
        })}
    </div>
  );
}
