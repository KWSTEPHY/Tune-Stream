import React, { useState } from "react";
import bg from "../Assets/HBB.png";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/tunestream-high-resolution-logo-white-transparent.png";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setIsRegistered(true);
  };

  if (isRegistered) {
    window.location.href = "/";
  }
  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page when logo is clicked
  };

  return (
    <>
      <section className="section">
        <div className="flex items-center justify-center bg-cover h-screen bg-[#121212] bg-custom-gradient overflow-y-auto">
          {/* <img
            src={bg}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          /> */}
          <div className="w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-neutral-600 bg-opacity-60 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden px-8 pt-6 pb-8 mb-4">
          <div className="text-center ml-20 mb-6">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
                onClick={handleLogoClick} // Add onClick handler to logo
              />
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="username" className="block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.password}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-red-500"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUpPage;
