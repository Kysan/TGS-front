import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

const Navbar = ({ username, pp_url }) => {
  // rajouter une couleur avec un gradiant sur le hover:
  const cn = "flex flex-row space-x-4 hover:bg-green-900 p-2 rounded"; //"text-white bg-black hover:bg-purple-900 p-5 rounded-md";
  // const selectedCN = " à faire";

  return (
    // "relative flex bg-gradient-to-r from-gray-900 to-red-600 rounded py-2 px-5 mt-1 w-full h-full items-center"
    <nav className="h-16 flex-none w-full bg-gradient-to-l from-green-600 to-green-700 rounded items-center flex flex-row">
      {/* <img src={brandImgUrl} className="w-auto h-8 w-auto" /> */}
      <div className="mx-4">TGS</div>
      <div className="pl-4 flex flex-row space-x-8">
        <Link to={"/"} className={cn}>
          <SearchIcon />
          <div className="invisible absolute md:visible md:relative">
            Get a ride
          </div>
        </Link>
      </div>
      <div className="absolute right-0 flex space-x-5 mr-5">
        <div>{username}</div>
      </div>
    </nav>
  );
};

export default Navbar;
