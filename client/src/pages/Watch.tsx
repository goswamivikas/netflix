import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";

export const Watch: React.FC = () => {
  return (
    <div className="watch w-scree bg-netflix-black h-screen">
      <div className="back absolute top-2 left-2 z-10 flex cursor-pointer items-center text-white">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className="video h-full w-full"
        autoPlay
        controls
        src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
      />
    </div>
  );
};
