import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

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
      className={`mynavbar fixed top-0 z-50 w-full text-[1.5vw] text-white md:text-[1vw] ${gradient}`}
    >
      <div className="mycontainer flex h-16 flex-row items-center justify-between px-[4%]">
        <div className="myleft children:mr-4 children:cursor-pointer flex items-center">
          <img
            className="h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix logo"
          />
          <Link to="/">
            <span>Hompage</span>
          </Link>
          <Link to="/series">
            <span>Series</span>
          </Link>
          <Link to="/movies">
            <span>Movies</span>
          </Link>
          <Link to="/">
            <span>New and popular</span>
          </Link>
        </div>
        <div className="myright children:mr-4 children:cursor-pointer flex items-center">
          <Search className="myicon" />
          <span className="">KID</span>
          <Notifications />
          <img
            className="h-8 w-8 cursor-pointer rounded object-cover"
            src="https://i.imgur.com/WM6zTNc.png"
            alt="profile_image"
          />
          <div className="profile children:hover:flex children:hover:flex-col rounded bg-black">
            <ArrowDropDown />
            <div className="options children:cursor-pointer children:p-2.5 absolute hidden bg-black">
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
