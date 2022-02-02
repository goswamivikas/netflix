import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";

export default function Featured() {
  return (
    <div className="featured h-[90vh] border-2 border-red-500 relative">
      <img
        className="w-full h-full object-cover"
        src="https://media.istockphoto.com/photos/first-person-point-of-view-of-a-woman-paddling-on-a-stand-up-paddle-picture-id1288844330?s=612x612"
        alt=""
      />
    </div>
  );
}
