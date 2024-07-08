import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import * as React from "react";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-project-new-1.onrender.com/signin",
        {
          username,
          password,
        }
      );

      console.log(response);
      if (response.data.success) {
        navigate("/quiz");
      } else {
        // Handle other status codes or errors if needed
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Login failed");
    }
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button
          onClick={navigateToSignUp}
          className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
