import { useState, useRef } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleIcon, CloseIcon, EyeIcon } from "../components/Icons";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const loginInputRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();

  const handleExit = () => navigate("/");

  const handleLoginInputChange = (e) => setLoginInput(e.target.value);
  const handleLoginPasswordChange = (e) => setLoginPassword(e.target.value);

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginInput, loginPassword);
      alert(`Login successful as ${isAdmin ? "Admin" : "User"}!`);
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert(`Google login successful as ${isAdmin ? "Admin" : "User"}!`);
      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 8%, #3a3020 18%, #4a4028 28%, #5a5030 40%, #6a6038 55%, #7a7040 70%, #8a8048 80%, #2a2a2a 90%, #000000 100%)",
      }}
    >
      <button
        className="fixed top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white text-black z-50 hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center"
        onClick={handleExit}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px] sm:min-h-[700px]">
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 ">
                <div className="w-full max-w-md">
                  <div className="text-center">
                    <h2
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "serif" }}
                    >
                      LOGIN
                    </h2>
                    <p className="text-xs sm:text-sm text-black mb-4 sm:mb-6 px-2">
                      If you have an account with us, please log in.
                    </p>
                  </div>

                  {/* MAIN INPUT BLOCK */}
                  <div className="space-y-3 sm:space-y-4">
                    <input
                      ref={loginInputRef}
                      type="text"
                      value={loginInput}
                      onChange={handleLoginInputChange}
                      placeholder="Email address (abc@gmail.com)"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />

                    {/* PASSWORD */}
                    <div className="relative">
                      <input
                        ref={loginPasswordRef}
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                        placeholder="Password"
                        className="w-full px-3 py-2 pr-10 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        <EyeIcon isVisible={showLoginPassword} />
                      </button>
                    </div>

                    {/* ------ ADMIN CHECKBOX (VISIBLE) ----- */}
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="adminCheck"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                        className="mr-2 w-5 h-5 border border-gray-400 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="adminCheck"
                        className="text-sm text-gray-900 cursor-pointer select-none"
                      >
                        Login as Admin
                      </label>
                    </div>

                    {/* BUTTONS */}
                    <button
                      onClick={handleEmailLogin}
                      className="w-full bg-black text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 font-medium"
                    >
                      SIGN IN
                    </button>

                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 text-sm sm:text-base rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 font-medium flex items-center justify-center"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-4 sm:mt-6 space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => navigate("/signup")}
                        className="text-black hover:text-gray-700 font-medium"
                      >
                        Create an account
                      </button>
                    </p>
                    <button className="text-xs sm:text-sm text-gray-500 hover:text-gray-700">
                      Forgot your password?
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block lg:w-1/2 bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
