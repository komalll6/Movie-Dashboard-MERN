//new- 27-07-26 (new file)

// import { useState } from "react";
// import { login } from "../services/authService";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Signin() {
//   const navigate = useNavigate();
//   const { loginUser } = useAuth()

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await login(formData);

//       await loginUser(res.data.data);  //user: username:"abc", email:"xyz"
      
//       alert(res.data.message);
//       navigate("/home");
//       setFormData({ email: "", password: "" });
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Login failed. Is the backend server running?");
//     }
//   }

//   return (
//     <div className="auth-page">
//       {/* Visual Side */}
//       <div className="auth-visual">
//         <div className="auth-visual-content">
//           <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
//             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               {/* Flame */}
//               <path d="M9 18C9 20.5 10.5 22 12 22C13.5 22 15 20.5 15 18H9Z" fill="#ff7b54" opacity="0.8"/>
//               <path d="M10 18C10 19.5 11 20.5 12 20.5C13 20.5 14 19.5 14 18H10Z" fill="#ff6b8b"/>
//               {/* Body */}
//               <path d="M12 2C15 6 16.5 10 16.5 14.5C16.5 16 15.5 17 14 17H10C8.5 17 7.5 16 7.5 14.5C7.5 10 9 6 12 2Z" fill="white" />
//               {/* Fins */}
//               <path d="M7.5 13L4.5 16.5V17H7.5V13Z" fill="#7c3aed"/>
//               <path d="M16.5 13L19.5 16.5V17H16.5V13Z" fill="#7c3aed"/>
//               {/* Window */}
//               <circle cx="12" cy="9" r="2" fill="#fffbf7"/>
//               <circle cx="12" cy="9" r="1" fill="#22d3ee"/>
//             </svg>
//           </div>
//           <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: 'white' }}>
//             Welcome back to ToyVerse
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: '340px', margin: '0 auto 2.5rem', fontSize: '1rem' }}>
//             Unlocking creativity and developmental STEM skills for kids across India. Sign in to check your order details.
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
//             {[['10K+', 'Toys'], ['4.9★', 'Rating'], ['100K+', 'Parents']].map(([v, l]) => (
//               <div key={l} style={{ textAlign: 'center' }}>
//                 <div style={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', fontFamily: "'Fredoka', sans-serif" }}>{v}</div>
//                 <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 600 }}>{l}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Form Side */}
//       <div className="auth-form-side">
//         <div className="auth-form-inner anim-fadein-up">
//           <Link to="/" className="flex items-center gap-2" style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem', fontWeight: 600 }}>
//             ← Back to Home
//           </Link>
//           <h1 className="auth-form-title">Sign in</h1>
//           <p className="auth-form-sub">Don't have an account? <Link to="/signup" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Sign up →</Link></p>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <input type="email" name="email" className="form-input" placeholder="you@example.com" value={formData.email} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-input" placeholder="Enter your password" value={formData.password} onChange={onChange} required />
//             </div>
//             <div className="flex justify-end" style={{ marginBottom: '1.5rem' }}>
//               <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 600 }}>Forgot password?</a>
//             </div>
//             <button type="submit" className="btn btn-primary w-full btn-lg">Sign In →</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signin;


//new- 6-08-26 (new file)
// import { useState } from "react";
// import { login } from "../services/authService";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Signin() {
//   const navigate = useNavigate();
//   const { loginUser } = useAuth();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await login(formData);
//       loginUser(res.data.data, res.data.token);
//       navigate("/");
//     } catch (error) {
//       console.error("Login Error Details:", error);
//       alert(error.response?.data?.message || "Login failed. Check server status!");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0c0f] px-4">
//       <div className="w-full max-w-md bg-[#18161b] border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
//         <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
//         <p className="text-gray-400 text-sm mb-6">
//           Access your account to start streaming
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4 text-left">
//           <div>
//             <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={onChange}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={onChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-2 cursor-pointer shadow-lg shadow-red-600/20 disabled:opacity-50"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-6 text-xs text-gray-400 text-center">
//           New here?{" "}
//           <Link to="/signup" className="text-red-500 font-semibold hover:underline">
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signin;


import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Fixed: AuthContext se import kiya hai

function Signin() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(formData);
      loginUser(res.data.data, res.data.token);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d0c0f] px-4">
      <div className="w-full max-w-md bg-[#18161b] border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-gray-400 text-sm mb-6">
          Access your account to start streaming
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
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
            <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              placeholder="Enter password"
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          New here?{" "}
          <Link to="/signup" className="text-red-500 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;