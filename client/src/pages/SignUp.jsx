import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  //  Fetching All Data and store the state (Data stored in object way) :-

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  // Passing User Data in the backend side :0-

  const handleSumbit = async (e) => {

    e.preventDefault()
    
    try {

      setLoading(true)
      setError(false)

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json()

      setLoading(false)

      if (data.success === false) {
        
        setError(true)
        return

      }

      navigate('/')
      
    } catch (error) {

      setLoading(false)
      setError(true)
      
    }

  };

  // For Removing the error message in the ui

  useEffect(() => {
    
    if (error === true) {
      
      setTimeout(() => {

        setError(false)

      }, 2000)

    }

  });
  
  return (

    <div className='p-3 max-w-lg mx-auto '>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form onSubmit={handleSumbit} className='flex flex-col gap-4'>

        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="text" placeholder='Username' id="username" />
        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>

      </form>

      <div className='flex gap-2 mt-5'>

        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign In</span>
        </Link>

      </div>
      
      <p className='text-red-700 mt-5'>{error && 'Somthing Went Wrong...'}</p>

    </div>

  )

}

export default SignUp
