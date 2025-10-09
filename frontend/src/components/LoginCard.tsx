import React from "react";
import { Link } from "react-router-dom";
import {User, Lock} from "lucide-react"

const LoginCard: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-deepSeaBlue via-powderBlue to-lightSteelBlue rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-6 space-y-4">
        <img
          src="/src/assets/hotel-image.png"
          alt="Hotel"
          className="rounded-lg shadow-md w-full max-w-xs"
        />
        <div className="text-center">
          <h2 className="text-lg font-primaryfont-semibold text-[#36454F]">
            Welcome to Your Hotel Manager App!
          </h2>
          <p className="font-secondary text-sm text-[#36454F]/80 mt-2">
            Effortlessly manage your rooms, bookings, and bar sales. 
            Your success, our mission!
          </p>
          <Link to="/Register" className="font-secondary text-[#008080] text-sm font-medium hover:underline mt-3 inline-block">
            Register your Hotel
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
        <div className="text-center">
          <div className="border-2 border-charcoalGray rounded-full w-28 h-28 flex flex-col items-center justify-center mx-auto">
            <img
                src="/src/assets/logo-dark.png"
                alt="logo"
                className="w-3/5 max-w-xs"
            />
          </div>
          <h1 className="font-primary text-3xl font-bold text-[#36454F] mt-3">Hotel Hub</h1>
        </div>

        <form className="w-full max-w-sm space-y-4">
            <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full pl-10 p-3 rounded-full bg-[#FFFFF0] border border-[#4682B4] focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
            </div>
            <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                </div>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 p-3 rounded-full bg-[#FFFFF0] border border-[#4682B4] focus:outline-none focus:ring-2 focus:ring-[#008080]"
                />
            </div>
          <button
            type="submit"
            className="w-full p-3 rounded-full bg-[#008080] text-[#FFFFF0] font-semibold hover:bg-[#4682B4] transition-colors"
          >
            Login
          </button>
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-[#36454F] hover:text-[#008080]"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
