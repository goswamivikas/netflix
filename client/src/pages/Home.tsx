import Featured from "components/Featured";
import List from "components/List";
import Navbar from "components/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";

type propsTypes = {
  type?: string;
};

export interface ListInterface {
  _id: string;
  title: string;
  mediaType: string;
  genre: string;
  content: number[];
}

export const Home = ({ type }: propsTypes) => {
  const [lists, setLists] = useState<Array<ListInterface>>([]);
  const [genre, setGenre] = useState<string>("");
  const user = useContext(UserContext);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get("lists", {
          headers: {
            token: `Bearer ${user?.accessToken}`,
          },
          params: {
            type,
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
  }, [type, genre, user?.accessToken]);

  return (
    <div className="myhome relative overflow-hidden bg-[#141414] text-gray-700">
      <Navbar />
      <Featured type={type} />
      <div className="main-content absolute left-0 top-[calc(56.25vw*0.8)] z-20 w-full  md:top-[calc(56.25vw*0.7)]">
        {lists?.map((list, index) => (
          <List list={list} key={list._id} type={type} />
        ))}
      </div>
      <div className="h-96 w-screen"></div>
    </div>
  );
};
