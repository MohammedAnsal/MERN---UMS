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
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/EditUser";
import NewUser from "./pages/admin/NewUser";

const App = () => {

  return (
    <div className="overflow-y-hidden">
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
            <Route path="/admin/sign-in" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/edituser/:id" element={<EditUser />} />
            <Route path="/admin/adduser" element={<NewUser/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
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
