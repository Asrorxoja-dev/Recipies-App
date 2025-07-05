import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import backImg from "../../public/backImg.jpg";

function Signup() {
  const displayName = useRef();
  const email = useRef();
  const password = useRef();
  const photoUrl = useRef();
  const { signUpWithGoogleProvider, signup } = useSignup();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signUpWithGoogleProvider();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      displayName.current.value,
      email.current.value,
      password.current.value,
      photoUrl.current.value
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-4xl font-bold text-white text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-white text-sm font-semibold">Name</label>
            <input
              ref={displayName}
              type="text"
              id="username"
              placeholder="Your name"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="photoUrl" className="text-white text-sm font-semibold">Photo URL</label>
            <input
              ref={photoUrl}
              type="url"
              id="photoUrl"
              placeholder="Profile photo link"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-white text-sm font-semibold">Email</label>
            <input
              ref={email}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white text-sm font-semibold">Password</label>
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 flex items-center justify-center gap-3 mt-2 rounded-xl bg-white font-medium shadow hover:shadow-lg transition"
          >
            <FcGoogle className="text-xl" /> Sign up with Google
          </button>

          <p className="text-center text-white text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 font-bold underline hover:text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
