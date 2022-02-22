import Featured from "components/Featured";
import List from "components/List";
import Navbar from "components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";

export interface ListInterface {
  _id: string;
  title: string;
  media_type: string;
  genre: { id: number; name: string };
  content: { id: number; media_type: string }[];
}

export const Home = ({ media_type }: { media_type?: string }) => {
  const [lists, setLists] = useState<Array<ListInterface>>([]);
  const [genre, setGenre] = useState<string>("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get("lists", {
          headers: {
            token: `Bearer ${user?.accessToken}`,
          },
          params: {
            media_type,
            genre,
          },
        });
        console.log({ lists: response.data });
        setLists(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [media_type, genre, user?.accessToken]);

  return (
    <div className="myhome relative h-screen w-screen overflow-x-hidden bg-[#141414] text-gray-700">
      <Navbar />
      <Featured media_type={media_type} />
      <div className="main-content absolute left-0 top-[calc(56.25vw*0.8)] z-20 w-full  md:top-[calc(56.25vw*0.7)]">
        {lists?.map((list, index) => (
          <List list={list} key={list._id} type={media_type} />
        ))}
      </div>
    </div>
  );
};
