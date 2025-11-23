import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
    const {
        setShowSearch,
        setToken,
        setCartItems,
        getCartCount,
        token,
        navigate,
    } = useContext(ShopContext);

    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    };
    return (
        <header className='w-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-md'>
            <nav className='flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
                <Link to='/' className='flex items-center gap-3 group'>
                    <img className='w-12 group-hover:scale-110 transition' src={'/custom_logo.png'} onError={(e)=>{e.target.onerror=null; e.target.src=assets.logo}} alt='RentIt logo' />
                    <span className='text-2xl font-bold text-white'>RentIt</span>
                </Link>
                <ul className='hidden sm:flex text-sm gap-8 text-white'>
                    <NavLink to='/' className='group flex flex-col items-center gap-1 hover:text-blue-100 transition'>
                        <p className='font-medium'>HOME</p>
                        <hr className='group-[.active]:h-0.5 group-[.active]:w-3/4 group-[.active]:border-none group-[.active]:bg-white w-0 group-hover:w-3/4 group-hover:h-0.5 group-hover:border-none group-hover:bg-blue-100 transition-all' />
                    </NavLink>

                    <NavLink to='/collection' className='group flex flex-col items-center gap-1 hover:text-blue-100 transition'>
                        <p className='font-medium'>BROWSE</p>
                        <hr className='group-[.active]:h-0.5 group-[.active]:w-3/4 group-[.active]:border-none group-[.active]:bg-white w-0 group-hover:w-3/4 group-hover:h-0.5 group-hover:border-none group-hover:bg-blue-100 transition-all' />
                    </NavLink>{" "}

                    <NavLink to='/about' className='group flex flex-col items-center gap-1 hover:text-blue-100 transition'>
                        <p className='font-medium'>ABOUT</p>
                        <hr className='group-[.active]:h-0.5 group-[.active]:w-3/4 group-[.active]:border-none group-[.active]:bg-white w-0 group-hover:w-3/4 group-hover:h-0.5 group-hover:border-none group-hover:bg-blue-100 transition-all' />
                    </NavLink>{" "}

                    <NavLink to='/contact' className='group flex flex-col items-center gap-1 hover:text-blue-100 transition'>
                        <p className='font-medium'>CONTACT</p>
                        <hr className='group-[.active]:h-0.5 group-[.active]:w-3/4 group-[.active]:border-none group-[.active]:bg-white w-0 group-hover:w-3/4 group-hover:h-0.5 group-hover:border-none group-hover:bg-blue-100 transition-all' />
                    </NavLink>{" "}
                </ul>

                <div className='flex items-center gap-6'>
                    <img
                        onClick={() => setShowSearch(true)}
                        className='w-5 cursor-pointer hover:scale-110 transition'
                        src={assets.search_icon}
                        alt='search icon'
                    />

                    <div className='group relative'>
                        <img
                            onClick={() => (token ? null : navigate("/login"))}
                            className='w-5 min-w-5 cursor-pointer hover:scale-110 transition'
                            src={assets.profile_icon}
                            alt='profile icon'
                        />

                        {token && (
                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-3 drop-shadow-xl z-50'>
                                <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-white text-gray-700 rounded-lg border border-gray-200 shadow-xl'>
                                    <p onClick={() => navigate('/new-listing')} className='cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition'>✨ New Listing</p>
                                    <p onClick={() => navigate('/requests')} className='cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition'>📋 Requests</p>
                                    <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition'>👤 My Profile</p>
                                    <p
                                        onClick={() => navigate("/orders")}
                                        className='cursor-pointer hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition'
                                    >
                                        📦 Orders
                                    </p>
                                    <hr className='my-1 border-gray-200' />
                                    <p
                                        onClick={logout}
                                        className='cursor-pointer hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded transition font-medium'
                                    >
                                        🚪 Logout
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to='/cart' className='relative group'>
                        <img
                            className='w-5 min-w-5 group-hover:scale-110 transition'
                            src={assets.cart_icon}
                            alt='cart icon'
                        />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-gradient-to-r from-primary-600 to-accent-600 text-white aspect-square leading-4 rounded-full text-[8px] font-bold'>
                            {getCartCount()}
                        </p>
                    </Link>
                    
                    {/* -------menu icon------- */}
                    <img
                        onClick={() => setOpenModal(true)}
                        className='sm:hidden w-5 cursor-pointer hover:scale-110 transition'
                        src={assets.menu_icon}
                        alt='menu icon'
                    />
                </div>

                {/* --------navbar sidebar for mobile screen----- */}

                <div
                    className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gradient-to-b from-blue-600 to-blue-500 transition-all ${openModal ? "w-full" : "w-0"
                        }`}
                >
                    <div className='flex flex-col text-white'>
                        <div
                            onClick={() => setOpenModal(false)}
                            className='flex items-center gap-2 p-3 cursor-pointer bg-blue-700 text-white'
                        >
                            <img
                                className='h-4 rotate-180 filter brightness-0 invert'
                                src={assets.dropdown_icon}
                                alt='dropdown icon'
                            />
                            <p className='text-sm font-semibold'>Back</p>
                        </div>

                        <NavLink
                            onClick={() => setOpenModal(false)}
                            to='/'
                            className='border-b border-blue-400 py-4 pl-6 hover:bg-blue-700 hover:text-white transition font-medium'
                        >
                            🏠 HOME
                        </NavLink>
                        <NavLink
                            onClick={() => setOpenModal(false)}
                            to='/collection'
                            className='border-b border-blue-400 py-4 pl-6 hover:bg-blue-700 hover:text-white transition font-medium'
                        >
                            🛍️ LISTINGS
                        </NavLink>
                        <NavLink
                            onClick={() => setOpenModal(false)}
                            to='/about'
                            className='border-b border-blue-400 py-4 pl-6 hover:bg-blue-700 hover:text-white transition font-medium'
                        >
                            ℹ️ ABOUT
                        </NavLink>
                        <NavLink
                            onClick={() => setOpenModal(false)}
                            to='/contact'
                            className='border-b border-blue-400 py-4 pl-6 hover:bg-blue-700 hover:text-white transition font-medium'
                        >
                            📞 CONTACT
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
