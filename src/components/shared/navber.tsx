"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ImgLogo from "@/app/assets/logo.png";

export default function NavBer() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    if (typeof window !== "undefined") {
      const todayPlan = JSON.parse(localStorage.getItem("todayPlan") || "[]");
      const savedPlan = JSON.parse(localStorage.getItem("savedPlan") || "[]");
      setPlanCount(todayPlan.length);
      setSavedCount(savedPlan.length);
    }
  };

  useEffect(() => {
    updateCounts();

    const handleStorageChange = () => updateCounts();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const workoutActive = pathname === "/" || pathname.startsWith("/workout") || pathname.startsWith("/allCard");
  const planActive = pathname === "/myplan";

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={`rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
            workoutActive
              ? "bg-lime-950 text-lime-400"
              : "text-gray-400 hover:text-lime-400"
          }`}
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/myplan"
          className={`rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
            planActive
              ? "bg-lime-950 text-lime-400"
              : "text-gray-400 hover:text-lime-400"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#070a12] text-white px-4 md:px-8 border-b border-[#161c2e]">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            type="button"
            tabIndex={0}
            aria-label="Open navigation menu"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box bg-[#0b0f19] border border-[#161c2e] p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost flex items-center gap-2 text-xl hover:bg-transparent"
        >
          <Image src={ImgLogo} alt="FitLog Logo" width={25} height={25} />
          <span className="font-bold tracking-wider">FITLOG</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end flex gap-5">
        <Link
          href="/myplan?tab=today"
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-semibold"
        >
          <span>Plan</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-400 text-sm font-extrabold text-black">
            {planCount}
          </span>
        </Link>

        <Link
          href="/myplan?tab=saved"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold"
        >
          <span>Saved</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700 text-sm text-gray-300 font-bold bg-[#0b0f19]">
            {savedCount}
          </span>
        </Link>
      </div>
    </div>
  );
}