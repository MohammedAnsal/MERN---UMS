import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData, setFormData] = useState({});

    const navigate = useNavigate()

    const handleChanges = async (e) => {   //   Save UserData in the state

        setFormData({...formData , [e.target.id] : e.target.value})

    }
        
    const handleSignIn = async (e) => {   //    Verify Sign In

        e.preventDefault();
        
        try {

            const res = await fetch(`/api/admin/signin`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });

            await res.json();
            navigate('/dashboard')
            
        } catch (error) {

            console.log(error.message);
            
        }

    };

    return (
      
        <div className='p-3 max-w-lg mx-auto '>

            <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign In</h1>

            <form onSubmit={handleSignIn} className='flex flex-col gap-4'>

                <input onChange={handleChanges} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
                <input onChange={handleChanges} className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>

            </form>
            
            <p hidden className='text-red-700 mt-5'>'Somthing Went Wrong...'</p>

        </div>
        
    )
    
}

export default Login
