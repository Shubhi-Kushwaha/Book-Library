import { useState, useEffect } from "react";
import { ShoppingBag, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; //  Import Firebase auth if you want login state

export default function Navbar() {
  const [bagCount, setBagCount] = useState(0);
  const [user, setUser] = useState(null); // track login state
  const navigate = useNavigate();

  //  Listen for bag updates
  useEffect(() => {
    const updateBag = () => {
      setBagCount(window.myBagCount || 0);
    };
    window.addEventListener("bag-updated", updateBag);
    updateBag(); // initialize
    return () => window.removeEventListener("bag-updated", updateBag);
  }, []);

  //  Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //  Bag modal open
  const handleBagClick = () => {
    window.dispatchEvent(new Event("open-bag"));
  };

  //  Login/Profile button click
  const handleProfileClick = () => {
    if (user) {
      // if logged in, go to dashboard or home
      navigate("/admin"); // or "/profile" if you want a user profile page
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white text-black shadow-md sticky top-0 z-50">
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Book Library
      </h1>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* My Bag */}
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

        {/* Profile/Login */}
        <button
          onClick={handleProfileClick}
          className="w-10 h-10 rounded-full bg-gray-200 text-black flex items-center justify-center hover:bg-gray-300"
        >
          <UserCircle className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
