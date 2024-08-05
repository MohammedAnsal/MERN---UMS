import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-300">
      <div className="flex max-w-6xl items-center justify-between p-5 mx-auto">
        <Link to="/">
          <h1 className="font-bold">U M S</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/sign-in'>
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
