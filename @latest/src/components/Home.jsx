import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ email }) {
  
  const [users, getUser] = useState([]);
  const { data, isSuccess, isLoading } = useGetUsersQuery();
  
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

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
