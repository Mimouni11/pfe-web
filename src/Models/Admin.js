// src/Models/Admin.js
import axios from "axios";
import SERVER_URL from "../config";

class Admin {
  static async createUser(user) {
    try {
      const response = await axios.post(
        `http://${SERVER_URL}:5001/add_user`,
        user, // Send the user object directly as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }
}

export default Admin;
