import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import backImg from "../../public/backImg.jpg";

function Login() {
  const { signUpWithGoogleProvider } = useSignup();
  const { login } = useLogin();

  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.current.value, password.current.value);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-4xl font-bold text-white text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={signUpWithGoogleProvider}
            className="w-full py-2 rounded-xl bg-white flex items-center justify-center gap-3 font-medium shadow hover:shadow-lg transition"
          >
            <FcGoogle className="text-xl" /> Login with Google
          </button>
          <p className="text-center text-white text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 font-bold underline hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
