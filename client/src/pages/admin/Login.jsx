import axios from "axios";
import React, { useState } from "react";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { signInSuccess } from '../../redux/user/userSlice';
import { useDispatch } from "react-redux";

const Login = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChanges = async (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  //  Validation :-

  const validation = () => {
   
    const { email, password } = formData;
   
    if (!email && !password || (email?.trim() == '' || password?.trim() == '')) {

      toast.error('field can not be empty')
      return false
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      toast.error('minimum 6 character Required')
      return false
    }

    return true
    
  };

  const handleSignIn = async (e) => { //  For Handle Admin Sign In

    e.preventDefault();

    try {

      if (validation()) {

        const res = await axios.post("/api/admin/signin", formData);
    
        if (res.data) {
    
          setError(false)
          dispatch(signInSuccess(res.data.admin))
         
          navigate("/admin/dashboard");
          toast.success('SignIn Successfully...')
    
        } else {
    
          setError(true)
    
        }

      }

    } catch (error) {

      console.log(error.message);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="p-6 max-w-lg w-full mx-auto bg-gray-900 text-white rounded-lg shadow-md">
        <h1 className="text-3xl text-center font-semibold mb-7">
          Admin
        </h1>
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            onChange={handleChanges}
            className=" p-3 text-black rounded-lg focus:outline-none focus:ring-2"
            type="email"
            placeholder="Email"
            id="email"
          />
          <input
            onChange={handleChanges}
            className="text-black p-3 rounded-lg focus:outline-none focus:ring-2"
            type="password"
            placeholder="Password"
            id="password"
          />
          <button
            className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition duration-200"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="text-red-700 mt-5">
          {error ? 'Somthing Went Wrong' : ''}
        </p>
      </div>
    </div>
  );
};

export default Login;
