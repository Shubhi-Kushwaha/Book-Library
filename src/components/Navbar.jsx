import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [authPage, setAuthPage] = useState("login"); // "login" or "signup"

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-gray-800 to-black text-white">
        {/* Left side */}
        <h1 className="text-xl font-bold">Book Library</h1>

        {/* Right side */}
        <button
          onClick={() => {
            setAuthPage("login");
            setShowAuth(true);
          }}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200"
        >
          {/* Profile icon */}
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
      </nav>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          page={authPage}
          onClose={() => setShowAuth(false)}
          switchPage={(p) => setAuthPage(p)}
        />
      )}
    </>
  );
}
