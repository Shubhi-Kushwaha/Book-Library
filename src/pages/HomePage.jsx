import { useState } from "react";
import { UserCircle } from "lucide-react";
import LoginPage from "./LoginPage";
import BookLibraryApp from "../BookLibraryApp"; // make sure the path is correct

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authPage, setAuthPage] = useState("login");
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for navbar effect
  const isHomePage = true; // Since this is HomePage
  const isAuthPage = false; // Only true if you're on /login or /signup

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 10%, #8a8048 90%, #000 100%)",
      }}
    >
    
      

      {/* Main Content: Book Library System */}
      <main className="flex-1">
        <BookLibraryApp />
      </main>

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
