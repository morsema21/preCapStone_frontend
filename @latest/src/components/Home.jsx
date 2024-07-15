import React from "react";
import axios from "axios";

const Home = () => {
  const getUsers = async () => {
    try {
      const response = await axios.get(
        //TODO verify URL with aaron
        "https://precapstone-backend.onrender.com/api/user/users"
      );
    } catch (err) {
      console.error("Error");
    }
  };

  const handleDelete = (userId) => {
    //TODO delete user function
    deleteUser(userId);
  };

  const handleUpdate = (userId) => {
    updateUser(userId);
    //TODO update user function
  };

  return (
    // TODO for each user have the buttons
    <div>
      <div>
        {isSuccess &&
          users.map((user) => {
            return <p key={user.id}>{user.email}</p>;
          })}
      </div>
      <button onClick={() => handleDelete(user.id)}>Delete</button>
      <button onClick={() => handleUpdate(user.id)}>Update</button>
    </div>
  );
};

export default Home;
