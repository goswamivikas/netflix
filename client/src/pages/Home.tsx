import Featured from "components/Featured";
import List from "components/List";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

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
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get("lists", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
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
  }, [type, genre]);

  return (
    <div className="myhome overflow-hidden bg-[#141414] text-gray-700">
      <Navbar />
      <Featured type={type} />
      {/* {lists?.map((list, index) =>
       / // index === 0 ? <List list={list} key={list._id} type={type} /> : null
      )} */}
      <div className="h-40 w-screen"></div>
    </div>
  );
};
