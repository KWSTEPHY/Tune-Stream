
import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const Home = ({ searchResults }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playId, setPlayId] = useState("");
  const [playType, setPlayType] = useState("");

  const trackListRef = useRef(null);
  const artistListRef = useRef(null);
  const albumListRef = useRef(null);
  const playlistListRef = useRef(null);
  const iframeRef = useRef(null); // Ref for iframe

  const scrollAmount = 600;
  const scrollDelay = 5000;
  const resumeDelay = 15000;
  let currentPosition = 0;

  const scrollAnimeList = (listRef) => {
    setInterval(function () {
      currentPosition += scrollAmount;
      if (listRef.current) {
        listRef.current.scroll({
          left: currentPosition,
          behavior: "smooth",
        });

        if (
          currentPosition >=
          listRef.current.scrollWidth - listRef.current.clientWidth
        ) {
          currentPosition = 0;
        }
      }
    }, scrollDelay);
  };

  useEffect(() => {
    scrollAnimeList(trackListRef);
    scrollAnimeList(artistListRef);
    scrollAnimeList(albumListRef);
    scrollAnimeList(playlistListRef);
  }, []);

  useEffect(() => {
    if (isPlaying && iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isPlaying]);

  const handlePlay = (category, play_id) => {
    setIsPlaying(true);
    setPlayId(play_id);
    setPlayType(category);
  };

  const handleManualScroll = (listRef, direction) => {
    clearInterval(scrollAnimeList);
    const scrollStep = direction === "left" ? -scrollAmount : scrollAmount;
    const newPosition = listRef.current.scrollLeft + scrollStep;
    listRef.current.scroll({
      left: newPosition,
      behavior: "smooth",
    });

    // Resume auto-scrolling after a delay
    currentPosition = newPosition;
    setTimeout(() => scrollAnimeList(listRef), resumeDelay);
  };

  const handleCancel = () => {
    setIsPlaying(false); // Hide the iframe when the cancel button is clicked
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1">
        {searchResults.tracks && searchResults.tracks.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mb-4">Tracks</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(trackListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden whitespace-nowrap space-x-4"
                ref={trackListRef}
              >
                {searchResults.tracks.items.slice(0, 15).map((track) => (
                  <li
                    key={track.id}
                    className="inline-block text-white/90 bg-black/70 rounded-lg shadow-lg w-64 border-2 border-white-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                  >
                    <button onClick={() => handlePlay("track", track?.id)}>
                      <img
                        className="relative left-12 top-4 h-40 w-40 rounded-full"
                        src={track.album.images[0]?.url || ""}
                        alt={track.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden text-left">
                        <h3 className="pt-2 text-lg font-bold">
                          {track.name.length > 20
                            ? track.name.substring(0, 20) + "..."
                            : track.name}
                        </h3>
                        <p className="text-sm font-light">
                          {track.album.name.length > 20
                            ? track.album.name.substring(0, 20) + "..."
                            : track.album.name}
                        </p>
                        <p className="text-sm font-light">
                          {track.artists
                            .map((artist) => artist.name)
                            .join(", ")
                            .substring(0, 30)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(trackListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}

        {searchResults.artists && searchResults.artists.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mt-8 mb-4">Artists</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(artistListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden overflow-y-none whitespace-nowrap space-x-4"
                ref={artistListRef}
              >
                {searchResults.artists.items.map((artist) => (
                  <li
                    key={artist.id}
                    className="inline-block text-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                  >
                    <button onClick={() => handlePlay("artist", artist.id)}>
                      <img
                        className="h-64 w-64  rounded-full p-8"
                        src={artist.images[0]?.url || ""}
                        alt={artist.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden">
                        <h3 className="text-lg font-bold">{artist.name}</h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(artistListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}

        {searchResults.albums && searchResults.albums.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mt-8 mb-4">Albums</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(albumListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden overflow-y-none whitespace-nowrap space-x-4"
                ref={albumListRef}
              >
                {searchResults.albums.items.map((album) => (
                  <li
                    key={album.id}
                    className="inline-block text-white/90 bg-black/70 rounded-lg shadow-lg w-64 border-2 border-white-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                  >
                    <button onClick={() => handlePlay("album", album?.id)}>
                      <img
                        className="h-64 w-full object-cover"
                        src={album.images[0]?.url || ""}
                        alt={album.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden">
                        <h3 className="pt-2 text-lg font-bold">
                          {album.name.length > 20
                            ? album.name.substring(0, 20) + "..."
                            : album.name}
                        </h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(albumListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}

        {searchResults.playlists && searchResults.playlists.items.length > 0 && (
          <div className="p-4">
            <h2 className="text-2xl text-white font-bold mt-8 mb-4">Playlists</h2>
            <div className="relative">
              <button
                id="scroll-left-btn"
                className="absolute left-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(playlistListRef, "left")}
              >
                <MdKeyboardDoubleArrowLeft size={48} />
              </button>
              <ul
                className="overflow-x-hidden overflow-y-none whitespace-nowrap space-x-4"
                ref={playlistListRef}
              >
                {searchResults.playlists.items.map((playlist) => (
                  <li
                    key={playlist.id}
                    className="inline-block text-white rounded-lg shadow-lg w-64 text-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300 hover:bg-black/40"
                  >
                    <button onClick={() => handlePlay("playlist", playlist?.id)}>
                      <img
                        className="h-64 w-full object-cover"
                        src={playlist.images[0]?.url || ""}
                        alt={playlist.name}
                      />
                      <div className="flex-1 m-4 overflow-hidden">
                        <h3 className="pt-2 text-lg font-bold">
                          {playlist.name.length > 20
                            ? playlist.name.substring(0, 20) + "..."
                            : playlist.name}
                        </h3>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                id="scroll-right-btn"
                className="absolute right-0 top-28 z-10 text-white px-2 py-1 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 duration-300"
                onClick={() => handleManualScroll(playlistListRef, "right")}
              >
                <MdKeyboardDoubleArrowRight size={48} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render Spotify Iframe if an item is clicked */}
      {isPlaying && (
        <div className="relative p-4 bg-black/90" ref={iframeRef}>
          <button
            className="absolute top-4 right-4 text-white bg-[#005167] px-2 py-1 rounded-sm"
            onClick={handleCancel}
          >
            <AiOutlineClose size={24} />
          </button>
          <iframe
            src={`https://open.spotify.com/embed/${playType}/${playId}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Home;
