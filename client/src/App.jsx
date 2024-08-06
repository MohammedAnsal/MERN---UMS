import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import SignIn from "./pages/client/SignIn";
import SignUp from "./pages/client/SignUp";
import Profile from "./pages/client/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/admin/Login";

const App = () => {

  return (

    <BrowserRouter>
      
      <Routes>

        {/*-- User Area --*/}
        
        <Route element={<UserLayout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

        </Route>

        {/*-- User Area --*/}
        
        <Route element={<AdminLayout />}>
      
          <Route path="/admin/sign-in" element={<Login/>} />

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
