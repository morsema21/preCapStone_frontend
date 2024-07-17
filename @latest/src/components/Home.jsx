import { useGetUsersQuery, useDeleteUserMutation } from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const token = window.sessionStorage.getItem("Token");
  const [users, getUser] = useState([]);
  const { data, isSuccess } = useGetUsersQuery(token);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      getUser(data);
    }
  }, [isSuccess]);

  const handleDelete = async (event, id) => {
    event.preventDefault();
    try {
      const response = await deleteUser(token, id);
      console.log(response);
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
                onClick={(event) => handleDelete(event, users.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => navigate("/api/user/users/:id")}
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
