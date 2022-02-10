import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";

type FeaturedProps = {
  type?: string;
};

export default function Featured({ type }: FeaturedProps) {
  return (
    <div className="featured relative h-[90vh]">
      {type && (
        <div className="category absolute top-20 left-12 flex items-center text-3xl font-medium text-white ">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            className="m-5 cursor-pointer border border-white bg-black p-1"
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
        className="h-full w-full object-cover"
        src="https://media.istockphoto.com/photos/first-person-point-of-view-of-a-woman-paddling-on-a-stand-up-paddle-picture-id1288844330?s=612x612"
        alt=""
      />
      <div className="info absolute left-12 bottom-24 flex w-[35%] flex-col text-white">
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
          <button className="play mr-2.5 cursor-pointer rounded border-none bg-white px-2.5 py-2.5 text-lg">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more mr-2.5 cursor-pointer rounded border-none bg-gray-600 px-2.5 py-2.5 text-lg text-white">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
