import React from "react";

const Page = ({ searchResults }) => {
  const [isHomePage, setIsHomePage] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistId, setPlaylistId] = useState("");
 


  const handleArtist = (artist_id) => {
    console.log(artist_id);
  };

  const handlePlaylist = (playlist_id) => {
    console.log("playlist id");
    console.log(playlist_id);

    setIsPlaying(!isPlaying)

    setPlaylistId(playlist_id)

  };

  return (
    <div className="flex flex-col h-screen ">
      {searchResults.tracks && (
        <div className="p-4">
          <h2 className="text-2xl text-white font-bold mb-4">Tracks</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4  ">
            {searchResults.tracks.items.slice(0, 15).map((track) => (
              <li
                key={track.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <img
                  className="h-64 w-full object-cover"
                  src={track?.album?.images[0]?.url}
                  alt={track?.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{track.name}</h3>
                  <p className="text-sm font-light">{track.album.name}</p>
                  <p className="text-sm font-light">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Artists</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4">
            {searchResults.artists.items.map((artist) => (
              <li
                key={artist.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <button onClick={() => handleArtist(artist.id)}>
                  <img
                    className="h-64 w-full object-cover rounded-full p-8"
                    src={artist?.images[0]?.url}
                    alt={artist?.name}
                  />
                  <div className="flex-1 m-4 overflow-hidden">
                    <h3 className="text-lg font-bold">{artist.name}</h3>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4">Albums</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4">
            {searchResults.albums.items.map((album) => (
              <li
                key={album.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <img
                  className="h-64 w-full object-cover"
                  src={album?.images[0]?.url}
                  alt={album?.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{album.name}</h3>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl text-white font-bold mt-8 mb-4 sticky top-0 h-10 z-10 bg-white/50 backdrop-blur">
            Playlists
          </h2>
          <ul className="grid grid-cols-4 gap-4">
            {searchResults.playlists.items.map((playlist) => (
              
              <li
                key={playlist.id}
                className="inline-block bg-white rounded-lg shadow-lg text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                   <button onClick={() => handlePlaylist(playlist?.id)}>
                <img
                  className="h-64 w-full object-cover"
                  src={playlist?.images[0]?.url}
                  alt={playlist?.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{playlist.name}</h3>
                </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
