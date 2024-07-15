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

  return (
    <div>
      {isSuccess &&
        users.map((user) => {
          return <p key={user.id}>{user.email}</p>;
        })}
    </div>
  );
}
