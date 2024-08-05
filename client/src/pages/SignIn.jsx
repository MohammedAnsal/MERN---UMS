import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();  //  Dispatch Function
  const { error, loading } = useSelector(state => state.user);  //  Fetching State Value

  //  handle and store all form data in the state :-

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  const handleSumbit = async (e) => {
     
    e.preventDefault();

    try {
       
      dispatch(signInStart())   //  First Dispatch

      const res = await fetch("/api/auth/signin", {
         
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         
        body: JSON.stringify(formData),
         
      });

      const data = await res.json();      

      if (data.success === false) {
         
        dispatch(signInFailure(data)) //  Seccond Dispatch
        return;
        
      };

      dispatch(signInSuccess(data)) //  Third Dispatch

      navigate("/");
      
    } catch (error) {
      
      dispatch(signInFailure(error)); //  Fourth Dispatch
      
    }
    
  };
 
  return (
      
    <div className='p-3 max-w-lg mx-auto '>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSumbit} className='flex flex-col gap-4'>

        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign In'}</button>

        <OAuth/>

      </form>

      <div className='flex gap-2 mt-5'>

        <p>Dont have an accout?</p>
        <Link to='/sign-Up'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>

      </div>
      
      <p className='text-red-700 mt-5'>{error ? error.message || 'Somthing Went Wrong...' : ''}</p>

    </div>

  )

};

export default SignIn
