import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(formData);

      // ✅ FIX: Flexible token & user extraction
      const token = res.data?.token || res.data?.data?.token;
      const user = res.data?.user || res.data?.data?.user || res.data?.data;

      if (token) {
        loginUser(user, token);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0c0f] px-4">
      <div className="w-full max-w-md bg-[#18161b] border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
        <p className="text-gray-400 text-sm mb-6">
          Create an account to join us
        </p>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-4 text-left"
        >
          <input type="text" style={{ display: "none" }} />
          <input type="password" style={{ display: "none" }} />

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="userName"
              autoComplete="off"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              placeholder="Choose username"
              value={formData.userName}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              placeholder="you@example.com"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              placeholder="Create password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 cursor-pointer shadow-lg shadow-red-600/20 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-red-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;