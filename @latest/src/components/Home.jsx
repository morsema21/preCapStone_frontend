import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
} from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home({ userId }) {
  // const { userId } = useParams();
  const [users, getUser] = useState([]);
  const { data, isSuccess, isLoading } = useGetUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
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

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      console.log(id);
      console.log(userId);
      console.log()
      if (userId !== id) {
        const response = await deleteUser({ id });
        getUser((users) => users.filter((user) => user.id !== id));
      } else {
        return alert("logged in");
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
                onClick={(event) => handleDelete(event, user.id)}
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
