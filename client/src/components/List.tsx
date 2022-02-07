import React from "react";

import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "./ListItem";

function List() {
  const listRef = React.useRef<HTMLDivElement>(null);

  const [slideNumber, setSlideNumber] = React.useState<number>(0);
  const [isMoved, setIsMoved] = React.useState<boolean>(false);

  const handleClick = (direction: string) => {
    if (listRef && listRef.current) {
      let distance: number = listRef.current?.getBoundingClientRect().x - 48;
      console.log({ distance });
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${244 + distance}px)`;
      }
      if (direction === "right") {
        setSlideNumber(slideNumber + 1);
        setIsMoved(true);
        listRef.current.style.transform = `translateX(${-244 + distance}px)`;
      }
    }
  };

  return (
    <div className="list mt-2 ">
      <span className="listTitle ml-12 text-xl font-medium text-white">
        Continue to watch
      </span>
      <div className="wrapper relative">
        {isMoved && (
          <ArrowBackIosOutlined
            onClick={() => handleClick("left")}
            style={{ width: "48px", height: "100%" }}
            className="absolute  left-0 z-50 cursor-pointer bg-[rgb(22,22,22,0.2)] text-white"
          />
        )}
        <div
          ref={listRef}
          className="containerss ml-12 flex w-max transition-all duration-1000 ease-in-out"
        >
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
          <ListItem index={10} />
          <ListItem index={11} />
        </div>
        <ArrowForwardIosOutlined
          onClick={() => handleClick("right")}
          style={{ width: "48px", height: "100%" }}
          className="absolute right-0 top-0 bottom-0 z-50 cursor-pointer bg-[rgb(22,22,22,0.2)] text-white"
        />
      </div>
    </div>
  );
}

export default List;
