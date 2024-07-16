import { useGetUsersQuery, useDeleteUserMutation } from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Users() {
  const token = window.sessionStorage.getItem("Token");
  const [users, getUser] = useState([]);
  const { data, isSuccess } = useGetUsersQuery(token);
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      getUser(JSON.parse(data));
    }
  }, [isSuccess]);

  const handleDelete = (userId) => {
    deleteUser(userId);
  };
  return (
    <div>
      {isSuccess &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
      <button onClick={() => handleDelete(users.id)} className="btn btn-danger">
        Delete
      </button>
      <button
        onClick={() => navigate("/api/user/users/:id")}
        className="btn btn-danger"
      >
        Update
      </button>
    </div>
  );
}
