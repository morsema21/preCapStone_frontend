import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
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
      const response = await deleteUser({ id });
      getUser((users) => users.filter((user) => user.id !== id));
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
