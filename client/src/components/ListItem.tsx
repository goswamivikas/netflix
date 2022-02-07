import * as React from "react";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";

function ListItem({ index }: { index: number }) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const trailer: string =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  // console.log({ isHovered });
  return (
    <div
      style={{ left: isHovered ? index * 240 - 72 + index * 2.5 : "" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="listItem bg-netflix-black group z-99 mr-1 h-32 w-60 cursor-pointer overflow-auto hover:absolute hover:-top-40 hover:h-96 hover:w-96 hover:rounded-md hover:shadow-md hover:shadow-[rgba(255,255,255,0.07)]"
    >
      <img
        className="h-full w-full object-cover group-hover:h-48"
        src="https://assets.whatsnewonnetflix.com/external_assets/sggkh+%5B%5Blxx*9*8566*8567_8_muochl_mvg%5Bzig%5B5y016%5Bu811660xz1xwz6x4574zw25259v2w0z6v475y016.jpg"
        alt="movie poster"
      />
      {isHovered && (
        <div className="">
          <video
            src={trailer}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 h-48 w-full object-cover"
          />
          <div className="itemInfo z-[999] flex flex-col overflow-visible p-2">
            <div className="icons mb-2 flex">
              <PlayArrow className="mr-2 rounded-full border-2 border-white p-1 text-base text-white" />
              <Add className="mr-2 rounded-full border-2 border-white p-1 text-base text-white" />
              <ThumbUpAltOutlined className="mr-2 rounded-full border-2 border-white p-1 text-base text-white" />
              <ThumbDownAltOutlined className="mr-2 rounded-full border-2 border-white p-1 text-base text-white" />
            </div>
            <div className="iteminfoTop mb-2 flex items-center text-sm font-semibold text-gray-400">
              <span>1 hour 14 mins</span>
              <span className="limit mx-2 border border-gray-400 py-0.5 px-1">
                +16
              </span>
              <span>1999</span>
            </div>
            <div className="desc text-sm text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              doloremque voluptatum commodi iste eveniet repellat?
            </div>
            <div className="genre text-base text-gray-300">Action</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;
