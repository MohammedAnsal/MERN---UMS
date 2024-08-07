import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const NewUser = () => {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleCgange = async (e) => {   //  For Add UserData the state
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  }

  const handleAddUser = async (e) => {
    
    e.preventDefault()

    try {

      const res = await axios.post("/api/admin/adduser", formData);

      if (res.data) {
        
        navigate('/admin/dashboard')

      }
      
    } catch (error) {

      console.log(error.message);
      
    }

  }

  return (

    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">

          Add New User
        </h1>

        <form onSubmit={handleAddUser}>

          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              onChange={handleCgange}
              type="text"
              id="username"
              name="userName"
              placeholder="Enter user name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              onChange={handleCgange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              onChange={handleCgange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Uncomment if needed
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-gray-600 dark:text-gray-300 mb-2"
            >
              Profile Picture URL
            </label>
            <input
              type="text"
              id="profilePicture"
              name="profilePicture"
              placeholder="Enter profile picture URL"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          */}

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all ease-in duration-[.3]"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
