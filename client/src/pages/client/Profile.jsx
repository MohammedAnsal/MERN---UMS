import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase/firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserAccount, signOut } from '../../redux/user/userSlice';
import useAuth from '../../hooks/useAuth';
import { toast } from 'sonner';
const Profile = () => {

  useAuth()

  const { currentUser, loading, error } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({});

  useEffect(() => { //  For call function

    
    if (image) {
      
      handleFileUpload(image);

    }

  }, [image]);

  //  Handle And Upload Image :-

  const handleFileUpload = async (image) => {
     
    const storage = getStorage(app);

    const fileName = new Date().getTime() + image.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(

      'state_changed',

      (snapshot) => {

        const progress =
          
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        setImagePercentage(Math.round(progress));

        if (progress == 100) setTimeout(() => { setImagePercentage(0) }, 2000);


      },

      (error) => {

        setImageError(true);

      },

      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>

          setFormData({ ...formData, profilePicture: downloadURL })

        );

      }

    );

  };

  const handleChange = async (e) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });
    
  }

  //  Handle Update User deatils :-

  const handleUpdate = async (e) => {

    e.preventDefault();
    
    try {
          
      dispatch(updateUserStart())
  
      const res = await fetch(`/api/user/update/${currentUser._id}`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
        
      const data = await res.json()
  
      if (data.success === false) {
           
        dispatch(updateUserFailure(data))
        return;
          
      };
  
      dispatch(updateUserSuccess(data)) //  Save Update
      toast.success("User is updated successfully...");

    } catch (error) {

      dispatch(updateUserFailure(error))

    }

  };

  // Delete Account :-

  const handleDeleteAccount = async (e) => {
    
    try {

      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE', headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });

      const data = await res.json();

      dispatch(deleteUserAccount(data))
      toast.success('Account Deleted Successfully...')
      
    } catch (error) {

      console.log(error.message);
      
    }

  };

  //  Handle Sign Out :-

  const handleSignOut = async (e) => {
    
    try {

      await fetch('/api/auth/signout');
      dispatch(signOut());
      toast.success('SignOut Successfully...');
      
    } catch (error) {

      console.log(error.message);
      
    }

  };
  
  return (

    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleUpdate} className='flex flex-col gap-4'>

        <input onChange={(e) => setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>

        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' />

        <p className='text-center'>
          
          {imageError ? (<span className='text-red-700'>Error uploading image</span>)
            
            : imagePercentage > 0 && imagePercentage < 100 ? (<span>{`Uploading: ${imagePercentage} %`}</span>) : imagePercentage === 100 ? (<span className='text-green-700'>Imgae uploaded successfully</span>) : ''}
        
        </p>

        <input onChange={handleChange} defaultValue={currentUser.userName} className='bg-slate-100 p-3 rounded-lg' type="text" placeholder='Username' id="username" />
        <input onChange={handleChange} defaultValue={currentUser.email} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
        <input onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'update'}</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error.message || 'Somthing Went Wrong...' : ''}</p>

    </div>

  )

}

export default Profile
