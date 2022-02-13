import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useVideo } from "components/Preview";
import { useSearchParams } from "react-router-dom";
import "./watch.css";

export const Watch: React.FC = () => {
  const [params] = useSearchParams();
  const type: any = params.get("type");
  const id: any = params.get("id");

  const [video] = useVideo({ type, id });
  return (
    <div className="watch absolute inset-0 bg-black">
      <div className="back absolute top-2 left-2 z-10 h-8 cursor-pointer items-center  text-white">
        <ArrowBackOutlined />
        Home
      </div>
      <div className="wrapper relative h-screen w-screen overflow-hidden">
        <iframe
          allowFullScreen
          src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&rel=0`}
          title={video?.name}
          className="absolute top-1/2  left-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};
