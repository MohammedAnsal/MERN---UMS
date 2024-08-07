import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import OAuth from '../../components/OAuth';
import { toast } from 'sonner';

const SignUp = () => {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  //  Fetching All Data and store the state (Data stored in object way) :-

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  //  Validation :-

  const validation = () => {
   
    const { username, email, password } = formData;
   
    if (!username && !email && !password || (username?.trim() == '' || email?.trim() == '' || password?.trim() == '')) {

      toast.error('field can not be empty')
      return false
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (username?.length < 4) {
      toast.error('username minimum 4 required')
      return false
    }
    if (password.length < 6) {
      toast.error('minimum 6 character Required')
      return false
    }

   
    return true
    
  };

  // Passing User Data in the backend side :-

  const handleSumbit = async (e) => {

    e.preventDefault()
    
    try {

      if (validation()) {
        
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
  
        if (data.success === false) {
          
          setError(true)
          return
  
        }

        setLoading(false)
  
        navigate("/sign-in")
        toast.success('SignUp Successfully...')

      }
      
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

        <OAuth/>
        
      </form>

      <div className='flex gap-2 mt-5'>

        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign In</span>
        </Link>

      </div>
      
      <p className='text-red-700 mt-5'>{error && 'Somthing Went Wrong...'}</p>

      <ToastContainer/>

    </div>

  )

}

export default SignUp
