import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase/firebase';

const Profile = () => {

  const { currentUser } = useSelector(state => state.user);

  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({});

  console.log(formData);
  
  useEffect(() => {
    
    if (image) {
      
      handleFileUpload(image);

    }

  }, [image]);

  // const handleFileUpload = async (img) => {
    
  //   const storage = getStorage(app)
  //   const fileName = new Date().getTime() + img.name
  //   const storageRef = ref(storage, fileName);
  //   const uploadImage = uploadBytesResumable(storageRef, img)
    
  //   uploadImage.on('state_changed', (snapshot) => {
      
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

  //     setImagePercentage(Math.round(progress));

  //   });

  //   (error) => {
      
  //     setImageError(true)

  //   }

  //   () => {
      
  //     getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
        
  //       setFormData({ ...formData, profilePicture: downloadURL });

  //     })

  //   }

  // };

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
  
  return (

    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>

        <input onChange={(e) => setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>

        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' />

        <p className='text-center'>
          
          {imageError ? (<span className='text-red-700'>Error uploading image</span>)
            
            : imagePercentage > 0 && imagePercentage < 100 ? (<span>{`Uploading: ${imagePercentage} %`}</span>) : imagePercentage === 100 ? (<span className='text-green-700'>Imgae uploaded successfully</span>) : ''}
        
        </p>

        <input defaultValue={currentUser.userName} className='bg-slate-100 p-3 rounded-lg' type="text" placeholder='Username' id="username" />
        <input defaultValue={currentUser.email} className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Email' id="email" />
        <input className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Password' id="password" />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

    </div>

  )

}

export default Profile
