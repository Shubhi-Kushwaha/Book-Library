import { useState, useRef } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleIcon, CloseIcon, EyeIcon, CheckIcon } from "../components/Icons";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [signupInput, setSignupInput] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const passwordsMatch = signupPassword.length > 0 && signupPassword === confirmPassword;
  const passwordsDontMatch = confirmPassword.length > 0 && signupPassword !== confirmPassword;

  const handleExit = () => navigate("/");

  const handleEmailSignup = async () => {
    if (!passwordsMatch) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupInput, signupPassword);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google signup successful!");
      navigate("/");
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
      {/* Close button */}
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
            <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px]">
              <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <div className="text-center">
                    <div className="mb-4 sm:mb-6">
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="mx-auto h-10 sm:h-12 w-auto"
                      />
                    </div>
                    <h2
                      className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "serif" }}
                    >
                      CREATE AN ACCOUNT
                    </h2>
                    <p className="text-xs sm:text-sm text-black mb-4 sm:mb-6 px-2">
                      Enter your information below to proceed. If you already
                      have an account, please log in instead.
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />

                    <input
                      type="text"
                      value={signupInput}
                      onChange={(e) => setSignupInput(e.target.value)}
                      placeholder="Email address (abc@gmail.com)"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />

                    {signupInput.length > 0 && (
                      <>
                        {/* Password */}
                        <div className="relative">
                          <input
                            type={showSignupPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-3 py-2 pr-10 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() =>
                              setShowSignupPassword(!showSignupPassword)
                            }
                          >
                            <EyeIcon isVisible={showSignupPassword} />
                          </button>
                        </div>

                        {/* Confirm password */}
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm Password"
                            className={`w-full px-3 py-2 pr-10 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${
                              passwordsMatch
                                ? "border-green-500"
                                : passwordsDontMatch
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                            {passwordsMatch && <CheckIcon />}
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              <EyeIcon isVisible={showConfirmPassword} />
                            </button>
                          </div>
                        </div>

                        {passwordsDontMatch && (
                          <p className="text-red-500 text-sm">
                            Passwords do not match. Please enter again.
                          </p>
                        )}
                        {passwordsMatch && (
                          <p className="text-green-500 text-sm">
                            Passwords match!
                          </p>
                        )}
                      </>
                    )}

                    <button
                      onClick={handleEmailSignup}
                      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 font-medium"
                    >
                      CREATE AN ACCOUNT
                    </button>

                    <button
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 font-medium flex items-center justify-center"
                    >
                      <GoogleIcon />
                      Continue with Google
                    </button>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        onClick={() => navigate("/login")}
                        className="text-black hover:text-gray-700 font-medium"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              {/* Right half (optional) */}
              <div className="hidden lg:block lg:w-1/2 bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
