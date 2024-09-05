import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/tunestream-high-resolution-logo-white-transparent.png";
import { PiUser } from "react-icons/pi";




import { TiHomeOutline } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";



const Navbar = ({ isHomePage, handleToggle, searchTerm, setSearchTerm }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page when logo is clicked
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center z-10 relative">
      <img
        src={Logo}
        alt="Logo"
        className="h-10 w-auto cursor-pointer"
        onClick={handleLogoClick}
      />

      {/* Search Input */}
      <div className="flex-1 flex justify-center">
        <div className="grid place-items-center">
          {!isHomePage && (
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to play?"
                defaultValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96 p-2 pl-10 pr-10 border border-gray-300 rounded-full bg-white text-gray-900"
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-white"
      >
        {isHomePage ? (
          <CiSearch  className="h-8 w-8 text-white" />
        ) : (
          <TiHomeOutline  className="h-8 w-8 text-white" />
        )}
      </button>

      <div className="flex items-center relative">
        {/* Profile Icon with Dropdown */}
        <div className="ml-3 relative size-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-white">
        <PiUser    
            size={38}
            className="text-white cursor-pointer"
            onClick={toggleDropdown}
          />

          {dropdownOpen && (
            <div className="absolute right-0 top-14 mt-2 w-48 bg-black text-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:text-gray-600"
              >
                Profile
              </Link>
              <Link
                to="/upgrade"
                className="block px-4 py-2 hover:text-gray-600"
              >
                Upgrade to Premium
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 hover:text-gray-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 hover:text-gray-600"
              >
                Signup
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:text-gray-600"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
