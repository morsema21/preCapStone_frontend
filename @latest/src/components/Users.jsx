import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from "./userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, getUser] = useState([]);
  const { data, isSuccess } = useGetUsersQuery();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      getUser(JSON.parse(data));
    }
  }, [isSuccess]);

  const [deleteUser] = useDeleteUserMutation();
  
  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  return (
    <div>
      {isSuccess &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
      <button onClick={() => handleDelete(users.id)}>Delete</button>
      <button onClick={() => navigate("/update")}>Update</button>
    </div>
  );
}
