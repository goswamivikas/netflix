import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";

type FeaturedProps = {
  type: string;
};

export default function Featured({ type }: FeaturedProps) {
  return (
    <div className="featured h-[90vh] relative">
      {type && (
        <div className="category absolute top-20 left-12 text-3xl font-medium text-white flex items-center ">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            className="cursor-pointer bg-black border border-white m-5 p-1"
            name="genre"
            id="genre"
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
          </select>
        </div>
      )}
      <img
        className="w-full h-full object-cover"
        src="https://media.istockphoto.com/photos/first-person-point-of-view-of-a-woman-paddling-on-a-stand-up-paddle-picture-id1288844330?s=612x612"
        alt=""
      />
      <div className="info absolute w-[35%] left-12 bottom-24 text-white flex flex-col">
        <img
          className="w-[400px]"
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
        />
        <span className="description my-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At vero
          iure, ex neque consequatur facere cum voluptate? Reprehenderit,
          repellendus illum.
        </span>
        <div className="buttons flex items-center justify-start text-black">
          <button className="play px-2.5 py-2.5 border-none rounded text-lg bg-white mr-2.5 cursor-pointer">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more px-2.5 py-2.5 border-none rounded text-lg bg-gray-600 text-white mr-2.5 cursor-pointer">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
