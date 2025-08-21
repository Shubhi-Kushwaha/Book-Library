import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [bagCount, setBagCount] = useState(0);
  const navigate = useNavigate();

  // 🔹 Listen for bag updates from BookLibraryApp
  useEffect(() => {
    const updateBag = () => {
      setBagCount(window.myBagCount || 0);
    };
    window.addEventListener("bag-updated", updateBag);
    updateBag(); // initialize
    return () => window.removeEventListener("bag-updated", updateBag);
  }, []);

  // 🔹 Open bag modal when button clicked
  const handleBagClick = () => {
    window.dispatchEvent(new Event("open-bag"));
  };

  // 🔹 Navigate to login page instead of AuthModal
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white text-black shadow-md sticky top-0 z-50">
        {/* Left side */}
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          Book Library
        </h1>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* My Bag button */}
          <button
            onClick={handleBagClick}
            className="relative bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">My Bag</span>
            {bagCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {bagCount}
              </span>
            )}
          </button>

          {/* Profile/Login button */}
          <button
            onClick={handleLoginClick}
            className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center hover:bg-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
