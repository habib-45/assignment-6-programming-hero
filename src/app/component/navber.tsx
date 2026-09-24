import Link from 'next/link';
import Image from 'next/image';
import ImgLogo from './assets/logo.png';
import React from 'react';

const NavBer = () => {

    const links = <>
        <li><Link className='font-bold text-[15px]' href="#workouts">Workouts</Link></li>
        <li><Link className='font-bold text-[15px]' href="#myplan">My Plan</Link></li>
    </>
    return (
        <div className='bg-base-200'>
            <div className="container mx-auto navbar shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link
                        href="#"
                        className="btn btn-ghost text-xl flex items-center gap-2"
                    >
                        <Image
                            src={ImgLogo}
                            alt="FitLog Logo"
                            width={25}
                            height={25}
                        />
                        FITLOG
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end flex gap-5">
                    <Link href="#myplan">
                        <button className="flex items-center gap-2 text-2xl text-gray-300">
                            Plan
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-xl font-semibold text-black">
                                0
                            </span>
                        </button>
                    </Link>
                    <Link href="#myplan">
                        <button className="flex items-center gap-2 text-2xl text-gray-400">
                            Saved
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-700 text-xl text-gray-300">
                                0
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBer;