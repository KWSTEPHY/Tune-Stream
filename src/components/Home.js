import React from 'react';

const Home = ({ searchResults }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [playId, setPlayId] = useState("");
  const [playType, setPlayType] = useState("");

  const handlePlay = (category, play_id) => {
    console.log("play id");
    console.log(play_id);

    setIsPlaying(!isPlaying)

    setPlayId(play_id)
    setPlayType(category)

  };

 

  return (

    isPlaying ? 
    <div>
      <iframe
        title="Spotify Embed: Recommendation Playlist "
        src={`https://open.spotify.com/embed/${playType}/${playId}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: '560px' }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
    
    :


    <div className="flex flex-col h-screen">
      {searchResults.tracks && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Tracks</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4">
            {searchResults.tracks.items.slice(0, 15).map((track) => (
              <li
                key={track.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <button onClick={() => handlePlay("track",track?.id)}>
                <img
                  className="h-64 w-full object-cover"
                  src={track.album.images[0].url}
                  alt={track.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{track.name}</h3>
                  <p className="text-sm font-light">{track.album.name}</p>
                  <p className="text-sm font-light">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">Artists</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4">
            {searchResults.artists.items.map((artist) => (
              <li
                key={artist.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <img
                  className="h-64 w-full object-cover rounded-full p-8"
                  src={artist.images[0].url}
                  alt={artist.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{artist.name}</h3>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4">Albums</h2>
          <ul className="overflow-x-auto whitespace-nowrap space-x-4">
            {searchResults.albums.items.map((album) => (
              <li
                key={album.id}
                className="inline-block bg-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <img
                  className="h-64 w-full object-cover"
                  src={album.images[0].url}
                  alt={album.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{album.name}</h3>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4 sticky top-0 h-10 z-10 bg-white/50 backdrop-blur">
            Playlists
          </h2>
          <ul className="grid grid-cols-4 gap-4">
            {searchResults.playlists.items.map((playlist) => (
              <li
                key={playlist.id}
                className="inline-block bg-white rounded-lg shadow-lg text-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
              >
                <img
                  className="h-64 w-full object-cover"
                  src={playlist.images[0].url}
                  alt={playlist.name}
                />
                <div className="flex-1 m-4 overflow-hidden">
                  <h3 className="text-lg font-bold">{playlist.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Home;
