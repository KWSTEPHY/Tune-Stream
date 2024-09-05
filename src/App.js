import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home";

import Navbar from "./components/Navbar";
import "./App.css";

function generateRandomCharacter() {
  const characters = "abcdefghijklmnopqrstuvwxyz";
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
      console.log(response.data);
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
      <Navbar
        isHomePage={isHomePage}
        handleToggle={handleToggle}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="bg-[#121212] bg-custom-gradient overflow-y-auto">
  

        <div className="relative">
        
            <Home searchResults={searchResults} />
       
        </div>
      </div>
    </div>
  );
};

export default App;



