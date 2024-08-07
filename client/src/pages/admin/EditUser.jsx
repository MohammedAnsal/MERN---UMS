import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase/firebase";

const EditUser = () => {

  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState({});
  const [image, setImage] = useState(undefined);
  const fileRef = useRef(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [imageError, setImageError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
      "state_changed",

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

    const handleEdit = async (e) => {    //  Handle User Edit

    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/edituser/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

        await res.json();
        setUpdateSuccess(true)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();  //  Call GetUser Function

    if (image) {
      handleFileUpload(image);  //  Call ImageUpload Function
    }
  }, []);

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
      <p className="text-green-700 mt-5 text-center">
        {updateSuccess ? "Updated successfully..." : ""}
      </p>
      </div>

      {/* <p className="text-red-700 mt-5">
        {error ? error.message || "Somthing Went Wrong..." : ""}
      </p> */}
    </div>
  );
};

export default EditUser;
