import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/Image/cons.jpg"; // Ensure the image is correctly placed in the 'assets' folder

const Home = () => {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay for Background Opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 bg-gray-800 bg-opacity-60 p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Welcome to Delight Developers
        </h1>
        <p className="text-lg text-gray-300 text-center mb-8">
        Victory Height Residency Building, Opp. Ayesha Tarin School, Anoop
        Shahar Road, Aligarh.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/form">
            <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
              Form
            </button>
          </Link>
          <Link to="/list">
            <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition">
             Customers
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
