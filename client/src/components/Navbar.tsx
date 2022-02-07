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
      className={`mynavbar fixed top-0 z-50 w-full text-sm text-white ${gradient}`}
    >
      <div className="mycontainer flex h-16 flex-row items-center justify-between px-12">
        <div className="myleft flex items-center children:mr-4 children:cursor-pointer">
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
            className="h-8 w-8 cursor-pointer rounded object-cover"
            src="https://i.imgur.com/WM6zTNc.png"
            alt="profile_image"
          />
          <div className="profile rounded bg-black children:hover:flex children:hover:flex-col">
            <ArrowDropDown />
            <div className="options absolute hidden bg-black children:cursor-pointer children:p-2.5">
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
