import React from "react";
import axios from "axios";

const Home = () => {
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://precapstone-backend.onrender.com/api/user/users"
      );
    } catch (err) {
      console.error("Error");
    }
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  const handleUpdate = (userId) => {
    updateUser(userId);
  };

  return (
    <div>
      <button onClick={() => handleDelete(user.id)}>Delete</button>
      <button onClick={() => handleUpdate(user.id)}>Update</button>
    </div>
  );
};

export default Home;
