import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

const SignIn = () => {

  const [formData, setFormData] = useState({});

  const navigate = useNavigate()

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

  }

  const handleSumbit = async (e) => {
    
    e.preventDefault();

    try {

      const res = await fetch('/api/auth/signin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });

      const data = await res.json()
      
    } catch (error) {

      console.log(error.message);
      
      
    }

  };

  return (
      
    <div className='p-3 max-w-lg mx-auto '>

      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSumbit}  className='flex flex-col gap-4'>

        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>

      </form>

      <div className='flex gap-2 mt-5'>

        <p>Create new account</p>
        <Link to='/sign-Up'>
        <span className='text-blue-500'>Sign Up</span>
        </Link>

      </div>
      
      <p className='text-red-700 mt-5'></p>

    </div>

  )
}

export default SignIn
