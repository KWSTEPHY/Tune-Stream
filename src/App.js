import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [isPlaying, setIsPlaying] = useState(false);

  const getAccessToken = async () => {
    const params = new URLSearchParams();
    params.append('client_id', 'd4d6a6bb920d40859a149b97feb4795d');
    params.append('client_secret', 'cc1094f210974810ae180d6ca69a8a2a');
    params.append('grant_type', 'client_credentials');

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchTerm,
          type: 'track,artist,album,playlist',
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
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

  return <>
    <div className="grid place-items-center mt-4">
      <input
        type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-96 p-4 border border-gray-300 rounded-lg"
      />
    </div>
    {searchResults.tracks && (
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Tracks</h2>
        <ul className="overflow-x-auto whitespace-nowrap space-x-4">
          {searchResults.tracks.items.slice(0, 15).map((track) => (
            <li key={track.id} className="inline-block bg-white rounded-lg shadow-lg w-64">
              <img className="h-64 w-full object-cover" src={track.album.images[0].url} alt={track.name} />
              <div className="flex-1 m-4 overflow-hidden">
                <h3 className="text-lg font-bold">{track.name}</h3>
                <p className="text-sm font-light">{track.album.name}</p>
                <p className="text-sm font-light">{track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
        <h2 className='text-2xl font-bold mt-8 mb-4'>Artists</h2>
        <ul className="overflow-x-auto whitespace-nowrap space-x-4">
          {searchResults.artists.items.map((artist) => (
            <li key={artist.id} className="inline-block bg-white rounded-lg shadow-lg w-64 text-center">
              <img className="h-64 w-full object-cover rounded-full p-8" src={artist.images[0].url} alt={artist.name} />
              <div className="flex-1 m-4 overflow-hidden">
                <h3 className="text-lg font-bold">{artist.name}</h3>
              </div>
            </li>
          ))}
        </ul>
        <h2 className='text-2xl font-bold mt-8 mb-4'>Albums</h2>
        <ul className="overflow-x-auto whitespace-nowrap space-x-4">
          {searchResults.albums.items.map((album) => (
            <li key={album.id} className="inline-block bg-white rounded-lg shadow-lg w-64 text-center">
              <img className="h-64 w-full object-cover" src={album.images[0].url} alt={album.name} />
              <div className="flex-1 m-4 overflow-hidden">
                <h3 className="text-lg font-bold">{album.name}</h3>
              </div>
            </li>
          ))}
        </ul>
        <h2 className='text-2xl font-bold mt-8 mb-4 sticky top-0 h-10 z-10 bg-white/50 backdrop-blur'>Playlists</h2>
        <ul className="grid grid-cols-4 gap-4">
          {searchResults.playlists.items.map((playlist) => (
            <li key={playlist.id} className="inline-block bg-white rounded-lg shadow-lg text-center">
              <img className="h-64 w-full object-cover" src={playlist.images[0].url} alt={playlist.name} />
              <div className="flex-1 m-4 overflow-hidden">
                <h3 className="text-lg font-bold">{playlist.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    <footer className='fixed w-full bottom-0 bg-red-500 h-20 flex items-center justify-center'>
      <div className="flex gap-4 text-white">
        <button type='button' className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg></button>
        <button type='button' onClick={() => setIsPlaying(!isPlaying)} className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center">
          {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>}
        </button>
        <button type='button' className="size-12 border-2 border-gray-300 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></button>
        </div>
        <div className="absolute left-10">
          <p>Song title</p>
          <p>00:00</p>
        </div>
    </footer>
  </>;
};

export default App;
