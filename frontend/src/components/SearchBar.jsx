import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection") ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible? (
    <div className='w-full border-t border-b bg-white text-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='inline-flex items-center justify-center border-2 border-blue-300 bg-blue-50 px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2 shadow-md hover:shadow-lg transition'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-inherit flex-1 outline-none text-sm'
          type='text'
          placeholder='Search'
        />
        <img className='w-4' src={assets.search_icon} alt='search icon' />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className='w-4 inline cursor-pointer hover:scale-110 transition'
        src={assets.cross_icon}
        alt='close icon'
      />
    </div>
  ) : null;
};

export default SearchBar;
