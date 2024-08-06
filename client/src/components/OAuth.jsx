import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { app } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

const OAuth = () => {

    const dispatch = useDispatch()  //  Call Dispatch

    const handleGoogle = async () => {
        
        try {

            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json()
            
            dispatch(signInSuccess(data));  //  Save Data 
            
        } catch (error) {

            console.log(error.message);
            
        }

    }

    return (
      
        <button onClick={handleGoogle} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Continue With Google</button>
                    
    )
    
};

export default OAuth
