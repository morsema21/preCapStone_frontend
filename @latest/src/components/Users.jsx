import { useGetUsersQuery } from "./userSlice";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, getUser] = useState([]);
  const { data, isSuccess } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      getUser(JSON.parse(data));
    }
  }, [isSuccess]);

  const handleDelete = (userId) => {
    //TODO delete user function
    deleteUser(userId);
  };

  const handleUpdate = (userId) => {
    updateUser(userId);
    //TODO update user function
  };

  return (
    <div>
      {isSuccess &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
      <button onClick={() => handleDelete(user.id)}>Delete</button>
      <button onClick={() => handleUpdate(user.id)}>Update</button>
    </div>
  );
}
