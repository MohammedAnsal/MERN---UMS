import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { signInSuccess } from "../redux/user/userSlice";

const useAuth = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
      
    (async () => {
        
      try {

        const { data } = await axios.get("/api/user/get");
        dispatch(signInSuccess(data.user))
          
      } catch (error) {

        console.log(error.message);
          
      }

    })();
        
  }, [])
  
};

export default useAuth;
