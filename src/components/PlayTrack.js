import React from "react";
import { useParams } from "react-router-dom";

const PlayTrack = () => {
  const { type, id } = useParams();

  return (
    <div className="flex justify-center items-center h-screen">
      <iframe
        title="Spotify Embed"
        src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "560px" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default PlayTrack;
