import React from "react";
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
import moviePosterFallback from "./moviePosterFallback.jpeg";
import { UserContext } from "../utils/UserContext";

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
  const { accessToken = null } = React.useContext(UserContext) || {};
  const baseURL: string = "https://image.tmdb.org/t/p/original";

  // React.useEffect(() => {
  //   if (index !== 1) return;
  //   const getItem = async () => {
  //     try {
  //       const res = await axios.get("/movies/" + id, {
  //         headers: {
  //           token:
  //             `Bearer ${accessToken}`,
  //         },
  //         params: {
  //           type,
  //         },
  //       });
  //       console.log({ movie: res.data });
  //       setItem(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getItem();
  // }, [id, type]);

  return (
    <div className="relative w-full overflow-visible px-[0.2vw] pt-[56.25%]">
      <Link to={{ pathname: "/watch", search: `id=${id}&type=${type}` }}>
        <div
          style={{}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="listItem group  group absolute inset-0 origin-center cursor-pointer rounded-t-[1px] px-[0.2vw] transition-all duration-200 ease-in-out hover:z-50 hover:scale-[1.75] hover:px-0 "
        >
          <img
            className="h-full w-full object-cover object-bottom group-hover:rounded-t-md"
            src={`${baseURL}${item?.poster_path || item?.backdrop_path}`}
            alt={item?.title ? item?.title : "Movie Poster"}
            title={item?.title ? item?.title : "Movie Poster"}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = moviePosterFallback;
            }}
          />
          {isHovered && <PreviewModal item={item} id={id} type={type} />}
        </div>
      </Link>
    </div>
  );
}

function PreviewModal({
  item,
  id,
  type,
}: {
  item: MovieItem | null;
  id: number;
  type?: string;
}) {
  return (
    <div className="preview-modal hidden w-full overflow-hidden group-hover:block">
      <Preview id={id} type={type} />
      <div className="itemInfo bg-netflix-black absolute flex w-full flex-col justify-around p-2 shadow-md shadow-[rgba(255,255,255,0.07)] transition-all">
        <div className="icons mb-3 flex">
          <PlayArrow className="mr-2 rounded-full border-2 border-slate-300 p-1 text-base text-slate-300 " />
          <Add className="mr-2 rounded-full border-2 border-slate-300 p-1 text-base text-slate-300" />
          <ThumbUpAltOutlined className="mr-2 rounded-full border-2 border-slate-300 p-1 text-base text-slate-300" />
          <ThumbDownAltOutlined className="mr-2 rounded-full border-2 border-slate-300 p-1 text-base text-slate-300" />
        </div>
        <div className="iteminfoTop mb-2 flex items-center text-[8px] font-semibold text-gray-400 ">
          <span className="pr-1 leading-none text-green-500">100% Match</span>
          <span>{item?.runtime} minutes</span>
          <span className="limit mx-2 border border-gray-400 py-0.5 px-1">
            {item?.adult ? "+18" : "+14"}
          </span>
          {/* <span>{item?.release_date}</span> */}
        </div>
        <div className="desc text-[8px] text-gray-300">{item?.tagline}</div>
        <div className="genre text-[8px] text-gray-300">
          <ul className="">
            {item?.genres?.map(
              (genre, index) =>
                index < 3 && (
                  <li
                    className="relative mr-2 mt-1.5 inline-block before:top-1/2 before:mr-2 before:inline-block before:h-0.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-gray-300 first:before:hidden "
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
