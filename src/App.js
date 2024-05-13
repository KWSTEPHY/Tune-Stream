import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home";
import Page from "./components/Page";
import { Link } from "react-router-dom";
import Logo from "./Assets/tunestream-high-resolution-logo-white-transparent.png"
import { VscAccount } from "react-icons/vsc";
import { LiaSignInAltSolid } from "react-icons/lia";
import bg from "./Assets/HBB.png";
import "./App.css";



function generateRandomCharacter() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState(generateRandomCharacter());
  const [searchResults, setSearchResults] = useState([]);
  const [isHomePage, setIsHomePage] = useState(true);

  const handleToggle = () => {
    setIsHomePage(!isHomePage);
    // Clear input value based on the toggle
    if (isHomePage) {
      setSearchTerm(""); // Clear the input value for !isHomePage
    }
  };

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append("client_id", "d4d6a6bb920d40859a149b97feb4795d");
    params.append("client_secret", "cc1094f210974810ae180d6ca69a8a2a");
    params.append("grant_type", "client_credentials");

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchTerm,
          type: "track,artist,album,playlist",
        },
      });
      setSearchResults(response.data);
      console.log (response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchSearchResults();
    }
  }, [accessToken, searchTerm]);
  return (



    <div className="flex flex-col h-screen">
      <nav className="bg-black p-4 flex justify-between items-center z-10">
      <img src={Logo} alt="Logo" className="h-10 w-auto" />
        

        {/* Search Input*/}
        <div className="flex-1 flex justify-center">
          <div className="grid place-items-center">
            {isHomePage && (
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96 p-4 border border-gray-300 rounded-lg"
                style={{ display: "none" }}
              />
            )}
            {!isHomePage && (
                <input
                type="text"
                placeholder="Search..."
                defaultValue={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-96 p-4 border border-gray-300 rounded-lg"
                />
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-white"
        >
          {isHomePage ? (
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className="h-8 w-8 text-white"
           viewBox="0 0 20 20"
           fill="currentColor"
         >
           <path
             fillRule="evenodd"
             d="M9.5 15a5.5 5.5 0 113.9-1.6l4.3 4.3a1 1 0 11-1.4 1.4l-4.3-4.3A5.5 5.5 0 019.5 15zm0-9a4 4 0 100 8 4 4 0 000-8z"
             clipRule="evenodd"
           />
         </svg>
         
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v2.293l3.646-3.647a1 1 0 111.415 1.414L11.414 8l3.647 3.647a1 1 0 11-1.414 1.414L10 9.415V12a1 1 0 11-2 0V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h2.293L3.646 5.354a1 1 0 10-1.414 1.414L6.586 9 2.232 13.354a1 1 0 101.414 1.414L6 10.414V13a1 1 0 102 0v-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M17 10a1 1 0 00-1-1h-2.293l3.647-3.646a1 1 0 10-1.414-1.414L13.415 9l4.354 4.354a1 1 0 101.414-1.414L15.414 11H18a1 1 0 001-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <div className="flex items-center">
          <Link
            to="/login"
            className="text-white py-1 px-2 ml-3 "
            
          >
            
<VscAccount size={46} />
          </Link>
          <Link
            to="/signup"
            className=" text-white py-1 px-2"
            style={{ borderRadius: "0.5rem" }}
          >
           <LiaSignInAltSolid size={55} />
          </Link>
        </div>
      </nav>
{/* <div className="background">
<img src={bg} alt="bg" className=" w-auto z-50" />

      <div className="flex-1 relative z-10">
        {isHomePage ? (
          <Home searchResults={searchResults} />
        ) : (
          <Page searchResults={searchResults} />
        )}
      </div>
    </div> */}
    <div className="bg-section " >
  <img src={bg} alt="bg" className="absolute inset-0 w-full h-screen object-cover z-0 bg-repeat-y" />

  <div className="relative z-10">
    {isHomePage ? (
      <Home searchResults={searchResults} />
    ) : (
      <Page searchResults={searchResults} />
    )}
  </div>
</div>

</div>
  );
};

export default App;
