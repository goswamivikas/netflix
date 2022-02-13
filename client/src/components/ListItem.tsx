import * as React from "react";
import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import axios from "axios";
import { MovieItem } from "./MovieItem";
import Preview from "./Preview";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const baseURL: string = "https://image.tmdb.org/t/p/original";

function ListItem({
  index,
  id,
  type,
}: {
  index: number;
  id: number;
  type?: string;
}) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<MovieItem | null>(null);
  const trailer: string =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  // console.log({ isHovered });

  React.useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get("/movies/" + id, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
          },
          params: {
            type,
          },
        });
        console.log({ movie: res.data });
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [id, type]);

  return (
    <Link to={{ pathname: "/watch", search: `id=${id}&type=${type}` }}>
      <div
        style={{ left: isHovered ? index * 240 - 72 + index * 2.5 : "" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="listItem bg-netflix-black group z-99 mr-1 h-32 w-60 cursor-pointer overflow-hidden hover:absolute hover:-top-40 hover:h-96 hover:w-96 hover:rounded-md hover:shadow-md hover:shadow-[rgba(255,255,255,0.07)]"
      >
        <img
          className="h-full w-full  group-hover:h-[216px]"
          src={`${baseURL}${item?.poster_path || item?.backdrop_path}`}
          alt="movie poster"
        />
        {isHovered && (
          <>
            <Preview id={id} type={type} />
            <div className="itemInfo z-[999] flex flex-col overflow-visible p-2">
              <div className="icons mb-3 flex">
                <PlayArrow
                  fontSize="large"
                  className="mr-2 rounded-full border-2 border-white p-1 text-base text-white"
                />
                <Add
                  fontSize="large"
                  className="mr-2 rounded-full border-2 border-white p-1 text-base text-white"
                />
                <ThumbUpAltOutlined
                  fontSize="large"
                  className="mr-2 rounded-full border-2 border-white p-1 text-base text-white"
                />
                <ThumbDownAltOutlined
                  fontSize="large"
                  className="mr-2 rounded-full border-2 border-white p-1 text-base text-white"
                />
              </div>
              <div className="iteminfoTop mb-2 flex items-center text-sm font-semibold text-gray-400">
                <span className="pr-1 leading-none text-green-500">
                  100% Match
                </span>
                <span>{item?.runtime} minutes</span>
                <span className="limit mx-2 border border-gray-400 py-0.5 px-1">
                  {item?.adult ? "+18" : "+14"}
                </span>
                <span>{item?.release_date}</span>
              </div>
              <div className="desc overflow-ellipsis text-sm text-gray-300">
                {item?.tagline}
              </div>
              <div className="genre my-3 text-base text-gray-300">
                <ul className="">
                  {item?.genres?.map((genre) => (
                    <li
                      className="relative mr-2 inline-block before:top-1/2 before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 first:before:w-0 "
                      key={genre.id}
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default ListItem;
