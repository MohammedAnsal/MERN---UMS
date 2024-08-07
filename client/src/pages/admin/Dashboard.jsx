import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from '../../redux/user/userSlice';
import { toast } from 'sonner';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUsersData = async () => { //  Fetch Users Data

    const { data } = await axios.get(`/api/admin/getusers`);
    setUsers(data.map((e) => ({ ...e })));

  };

  const handleDeleteUser = async (id) => {  //  For Delete User

    Swal.fire({

      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",

    }).then(async (result) => {

      if (result.isConfirmed) {

        await axios.delete(`/api/admin/deleteuser/${id}`);
        setUsersData(); // Again Call Same Function

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {

    setUsersData(); //  For Calling Function

  }, []);

  const filteredUsers = users.filter( //  For Search
  
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Handle SignOut

  const handleSignOut = async () => {
    
    try {

      dispatch(signOut())
      toast.success('SignOut Successfully...')
      
    } catch (error) {

      console.log(error.message);
      
    }

  };

  return (
    <div className="relative p-10 bg-gray-100 dark:bg-gray-900 h-screen">
      <div className="mb-4 text-2xl text-center font-semibold text-gray-700 uppercase dark:text-gray-200">
        Users
      </div>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/admin/adduser")} // Navigate to the Add User page
            className="bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-700 transition-all ease-in duration-[.3]"
          >
            Add User
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-700 transition-all ease-in duration-[.3]"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-y-auto mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 shadow-md rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Profile Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800">
            {filteredUsers.map((e) => (
              <tr key={e._id} className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {e.userName}
                </th>
                <td className="px-6 py-4 text-white">{e.email}</td>
                <td className="px-6 py-4">
                  <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={e.profilePicture}
                      alt="Profile"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/edituser/${e._id}`)}
                    className="bg-green-600 p-2  text-white rounded-md active:scale-75 transition-all ease-in duration-[.3]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(e._id)}
                    className="bg-red-600 p-2 text-white rounded-md active:scale-75 transition-all ease-in duration-[.3]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
