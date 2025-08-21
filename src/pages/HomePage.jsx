import { useState } from "react";
import { UserCircle } from "lucide-react";
import AuthModal from "../components/AuthModal";

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for navbar effect
  const isHomePage = true; // Since this is HomePage
  const isAuthPage = false; // Only true if you're on /login or /signup

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 10%, #8a8048 90%, #000 100%)",
      }}
    >
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-white">Book Library</h1>

        {/* Profile Icon */}
        <button onClick={() => setShowAuth(true)}>
          <UserCircle
            className={`w-8 h-8 ${
              (isHomePage && !isScrolled) || isAuthPage
                ? "text-white hover:text-gray-200"
                : "text-yellow-400 hover:text-yellow-300"
            }`}
          />
        </button>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          page={authPage}
          onClose={() => setShowAuth(false)}
          switchPage={(p) => setAuthPage(p)}
        />
      )}
    </div>
  );
}
