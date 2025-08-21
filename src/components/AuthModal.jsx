import { FcGoogle } from "react-icons/fc"; // Google logo

export default function AuthModal({ page, onClose, switchPage }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        
        

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {page === "login" ? "LOGIN" : "CREATE AN ACCOUNT"}
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          {page === "login"
            ? "If you have an account with us, please log in."
            : "Enter your information below to proceed. If you already have an account, please log in instead."}
        </p>

        {/* LOGIN FORM */}
        {page === "login" ? (
          <>
            <input
              type="email"
              placeholder="Email address (abc@gmail.com)"
              className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition mb-3">
              SIGN IN
            </button>
            <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <FcGoogle size={20} /> Continue with Google
            </button>
            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => switchPage("signup")}
              >
                Create an account
              </button>
            </p>
            <p className="text-center text-sm mt-2 text-gray-500 hover:text-black cursor-pointer">
              Forgot your password?
            </p>
          </>
        ) : (
          /* SIGNUP FORM */
          <>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address (abc@gmail.com)"
              className="w-full mb-3 px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
            <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition mb-3">
              CREATE AN ACCOUNT
            </button>
            <button className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <FcGoogle size={20} /> Continue with Google
            </button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => switchPage("login")}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
