import { useState } from "react";

export default function SignupForm({ switchPage, onClose }) {
  const [name, setName] = useState("");
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

      <div className="text-center mb-6">
        <img src="/logo.png" alt="Logo" className="mx-auto h-10 mb-2" />
        <h2 className="text-xl font-bold">CREATE AN ACCOUNT</h2>
        <p className="text-sm text-gray-600">
          Enter your information below to proceed. If you already have an
          account, please log in instead.
        </p>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full mb-3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />

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
        CREATE AN ACCOUNT
      </button>

      <button className="w-full bg-white border border-gray-300 py-2 rounded-md flex items-center justify-center">
        <span className="mr-2">🌐</span> Continue with Google
      </button>

      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={() => switchPage("login")}
            className="text-black font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
