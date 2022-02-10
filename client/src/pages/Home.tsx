import Featured from "components/Featured";
import List from "components/List";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

type propsTypes = {
  type?: string;
};

export const Home = ({ type }: propsTypes) => {
  const [lists, setLists] = useState<Array<any>>([]);
  const [genre, setGenre] = useState<string>("");
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const response = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDNlMmExYzlhOGY1NGEyMGY3ODhmNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ0Nzk5NDIsImV4cCI6MTY0NTA4NDc0Mn0._u8DIAdo33cWaUVEgtrUL2lGtGT4EOLFOFCBK4m7_sk",
            },
          }
        );
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
      {lists?.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};
