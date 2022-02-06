import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  // console.log(window.pageYOffset);
  // console.log(isScrolled);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  let gradient: string = isScrolled ? "bg-gradient-to-b from-black" : "";

  return (
    <div
      className={`mynavbar text-white text-sm fixed w-full top-0 z-50 ${gradient}`}
    >
      <div className="mycontainer px-12 flex flex-row items-center justify-between h-16">
        <div className="myleft flex items-center children:cursor-pointer children:mr-4">
          <img
            className="h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix logo"
          />
          <span>Hompage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and popular</span>
          <span>My List</span>
        </div>
        <div className="myright flex items-center children:mr-4 children:cursor-pointer">
          <Search className="myicon" />
          <span className="">KID</span>
          <Notifications />
          <img
            className="h-8 w-8 rounded object-cover cursor-pointer"
            src="https://i.imgur.com/WM6zTNc.png"
            alt="profile_image"
          />
          <div className="profile bg-black rounded children:hover:flex children:hover:flex-col">
            <ArrowDropDown />
            <div className="options hidden absolute bg-black children:p-2.5 children:cursor-pointer">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
