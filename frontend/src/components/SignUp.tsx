import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import * as React from "react";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password length
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        {
          username,
          password,
          email,
        }
      );

      const response = res.data;
      console.log(response);

      if (response.success) {
        // Successful sign-up
        alert("Sign-up successful");
        navigate("/quiz");
      } else {
        // Handle other status codes or errors if needed
        alert(response.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign up failed");
    }
  };

  const navigateToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <p className="text-red-500 text-xs italic mt-2">
            Password must be at least 6 characters long.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="mt-4 text-center">
        Have an account?{" "}
        <button
          onClick={navigateToSignIn}
          className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
