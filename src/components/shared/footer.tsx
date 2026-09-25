import React from "react";
import { FaDumbbell } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="flex justify-between items-center px-6">
                <div className="flex items-center gap-2">
                    <FaDumbbell className="text-lime-400 text-xl" />
                    <span className="font-bold text-lg">FITLOG</span>
                </div>

                <p className="text-sm text-gray-400">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
