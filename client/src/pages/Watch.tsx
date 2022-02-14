import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

export const Watch: React.FC = () => {
  return (
    <div className="watch w-scree bg-netflix-black h-screen">
      <Link to="/">
        <div className="back absolute top-2 left-2 z-10 flex cursor-pointer items-center text-white">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video h-full w-full"
        autoPlay
        controls
        src="https://res.cloudinary.com/vecdev/video/upload/v1644752022/netflix/React_18_Keynote-FZ0cG47msEk-720p-1644751630844_zyw6et.mp4"
      />
    </div>
  );
};
