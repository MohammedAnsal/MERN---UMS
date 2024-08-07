import React, { useEffect } from "react";

import { BrowserRouter, Navigate, Outlet, replace, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import SignIn from "./pages/client/SignIn";
import SignUp from "./pages/client/SignUp";
import Profile from "./pages/client/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/EditUser";
import NewUser from "./pages/admin/NewUser";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import useAuth from "./hooks/useAuth";

const App = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (

    <BrowserRouter>
      
      <Routes>
        
        {/*-- User Area --*/}

        <Route element={<UserLayout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={!currentUser ? <SignIn /> : <Navigate to={'/profile'} replace={true} />} />
          <Route path="/sign-up" element={!currentUser ? <SignUp /> : <Navigate to={'/profile'} replace={true} />} />
        
          <Route element={currentUser ? (<PrivateRoute />) : (<Navigate to={"/sign-in"} replace={true} />)}>
            
            <Route path="/profile" element={currentUser?.isAdmin ? <Navigate to={'/admin/dashboard'} replace={true} /> : <Profile />} />
              
          </Route>

        </Route>

        {/*-- Admin Area --*/}

        <Route path="/admin/sign-in" element={!currentUser?.isAdmin ? <Login /> : <Navigate to={'/admin/dashboard'} replace={true} />} />

        <Route element={currentUser?.isAdmin ? <AdminLayout /> : <Navigate to={'/admin/sign-in'} />}>
          
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/edituser/:id" element={<EditUser />} />
          <Route path="/admin/adduser" element={<NewUser />} />
          
        </Route>
        
      </Routes>
      
    </BrowserRouter>
    
  
  );

};

const UserLayout = () => {
  
  return (
    <>
      <Header />
      <Outlet />
    </>
  );

}

const AdminLayout = () => {
  
  return (
    <>
      <Outlet />
    </>
  );

}

export default App;
