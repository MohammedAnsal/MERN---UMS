import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux"; 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from 'sonner';
import { app } from "../../firebase/firebase";


const EditUser = () => {

  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({});
  const [image, setImage] = useState(undefined);
  const fileRef = useRef(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {

    const res = await fetch(`/api/admin/getuser/${id}`);
    const user = await res.json();

    setCurrentUser(user); //    Store user data in the state

    setFormData({ ...user }); //  Store user data in the formData state
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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

  const handleEdit = async (e) => {    //  Handle User Edit

    e.preventDefault();

    try {
      
      if (validation()) {
          
        const res = await fetch(`/api/admin/edituser/${id}`, {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),

        });
    
        await res.json();
        toast.success('Updated Successfully')
        
      }

    } catch (error) {
        
      console.log(error.message);
        
    }
      
  };

  useEffect(() => {

    getUserData();  //  Call GetUser Function

    if (image) {
      
      handleFileUpload(image);  //  Call ImageUpload Function
    }
  }, [image]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="p-6 max-w-lg w-full mx-auto bg-gray-900 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center my-7">User Edit</h1>
        <form onSubmit={handleEdit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          />
          <p className="text-center">
            {imageError ? (
              <span className="text-red-700">Error uploading image</span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-white">{`Uploading: ${imagePercentage} %`}</span>
            ) : imagePercentage === 100 ? (
              <span className="text-green-700">
                Imgae uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            onChange={handleChange}
            defaultValue={currentUser.userName}
            className="text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="text"
            placeholder="Username"
            id="username"
          />
          <input
            onChange={handleChange}
            defaultValue={currentUser.email}
            className="text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="email"
            placeholder="Email"
            id="email"
          />
          <input
            onChange={handleChange}
            className="text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="password"
            placeholder="Password"
            id="password"
          />
          <button className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition duration-200">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
