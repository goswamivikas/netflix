import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { MovieItem } from "./MovieItem";
import { Link } from "react-router-dom";
import Preview, { useVideo } from "./Preview";
type FeaturedProps = {
  type?: string;
};

export default function Featured({ type }: FeaturedProps) {
  const [item, setItem] = React.useState<MovieItem | null>(null);
  const [video] = useVideo({ id: item?.id, type: item?.media_type });
  React.useEffect(() => {
    const getRandomItem = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
          },
        });
        console.log({ getRandomItem: res.data });
        setItem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomItem();
  }, [type]);

  const baseUrl: string = "https://image.tmdb.org/t/p/original";
  const bgPoster: string = `${baseUrl + item?.backdrop_path}`;

  console.log({ bgPoster });

  return (
    <div className="featured relative h-[56.25vw] w-full">
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
        className="absolute top-0 left-0 h-full  w-full"
        src={`${bgPoster}`}
        alt="movie poster"
      />
      <div className="wrapper absolute inset-0   pb-[60%]">
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&controls=0&start=15`}
          title={video?.name}
          className="absolute left-0 top-0 h-full w-full border-2 border-orange-500"
        />
      </div>
      <div className="absolute z-10 h-full w-full bg-gradient-to-r from-black">
        <div className="info md: absolute left-[60px] bottom-[30%] flex w-[35%] flex-col  text-white">
          <span className="text-center text-3xl">{item?.title}</span>
          <span className="description my-5">
            {item?.overview?.substring(0, 100) + "..."}
          </span>
          <div className="buttons flex items-center justify-start text-black">
            <Link to="/watch">
              <button className="play mr-2.5 cursor-pointer rounded border-none bg-white px-2.5 py-2 text-lg">
                <PlayArrow />
                <span>Play</span>
              </button>
            </Link>
            <button className="more mr-2.5 cursor-pointer rounded border-none bg-gray-600 px-2.5 py-2 text-lg text-white">
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
