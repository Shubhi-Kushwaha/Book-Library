import { useState } from "react";

export default function LoginForm({ switchPage, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">LOGIN</h2>
      <p className="text-sm text-gray-600 text-center mb-6">
        If you have an account with us, please log in.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address (abc@gmail.com)"
        className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button className="w-full bg-black text-white py-2 rounded-md mb-3">
        SIGN IN
      </button>

      <button className="w-full bg-white border border-gray-300 py-2 rounded-md flex items-center justify-center">
        <span className="mr-2">🌐</span> Continue with Google
      </button>

      <div className="text-center mt-4">
        <p className="text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => switchPage("signup")}
            className="text-black font-semibold"
          >
            Create an account
          </button>
        </p>
        <button className="text-xs text-gray-500 mt-2">Forgot password?</button>
      </div>
    </div>
  );
}
