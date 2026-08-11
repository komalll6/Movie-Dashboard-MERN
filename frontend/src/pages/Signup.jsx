//new- 27-07-26 (new file)

// import { useState } from "react";
// import { register } from "../services/authService.js";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await register(formData);
//       alert(res.data.message);
//       navigate("/signin");
//       setFormData({ userName: "", email: "", password: "" });
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Signup failed. Is the backend server running?");
//     }
//   }

//   return (
//     <div className="auth-page">
//       {/* Visual */}
//       <div className="auth-visual">
//         <div className="auth-visual-content">
//           <div style={{ marginBottom: '1.5rem' }}>
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
//           <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
//             Join ToyVerse
//           </h2>
//           <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, maxWidth: '340px', margin: '0 auto 2rem', fontSize: '1rem' }}>
//             Create your parent account and unlock a world of educational, creative, and child-safe toys.
//           </p>
//           <div style={{ textAlign: 'left', maxWidth: '320px', margin: '0 auto' }}>
//             {["Free express delivery on orders above ₹999", "30-day hassle-free replacements", "Developer & STEM educator verified toys", "Premium child-safe materials guaranteed"].map(b => (
//               <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
//                 <span style={{ color: 'white', fontWeight: 700 }}>✓</span> <span>{b}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="auth-form-side">
//         <div className="auth-form-inner anim-fadein-up">
//           <Link to="/" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem', fontWeight: 600 }}>
//             ← Back to Home
//           </Link>
//           <h1 className="auth-form-title">Create account</h1>
//           <p className="auth-form-sub">Already have one? <Link to="/signin" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Sign in →</Link></p>

//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="form-label">Username</label>
//               <input type="text" name="userName" className="form-input" placeholder="Choose a username" value={formData.userName} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <input type="email" name="email" className="form-input" placeholder="you@example.com" value={formData.email} onChange={onChange} required />
//             </div>
//             <div className="form-group" style={{ marginBottom: '2rem' }}>
//               <label className="form-label">Password</label>
//               <input type="password" name="password" className="form-input" placeholder="Create a strong password" value={formData.password} onChange={onChange} required />
//             </div>
//             <button type="submit" className="btn btn-primary w-full btn-lg">Create Account →</button>
//           </form>
//           <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '1.5rem', lineHeight: 1.5 }}>
//             By signing up, you agree to our Terms of Service and Privacy Policy.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

//new- 6-08-26 (new file)
// import { useState } from "react";
// import { register } from "../services/authService";
// import { useNavigate, Link } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ userName: "", email: "", password: "" });

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await register(formData);
//       alert(res.data.message || "Account created!");
//       navigate("/signin");
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || "Signup failed.");
//     }
//   }

//   return (
//     <div className="auth-overlay-backdrop">
//       <div className="glass-auth-card">
//         <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", fontWeight: 700 }}>Sign Up</h2>
//         <p style={{ color: "#aaa", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
//           Create an account to join us
//         </p>

//         <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
//           <label style={{ fontSize: "0.85rem", color: "#ccc" }}>Username</label>
//           <input
//             type="text"
//             name="userName"
//             className="glass-input"
//             placeholder="Choose username"
//             value={formData.userName}
//             onChange={onChange}
//             required
//           />

//           <label style={{ fontSize: "0.85rem", color: "#ccc" }}>Email Address</label>
//           <input
//             type="email"
//             name="email"
//             className="glass-input"
//             placeholder="you@example.com"
//             value={formData.email}
//             onChange={onChange}
//             required
//           />

//           <label style={{ fontSize: "0.85rem", color: "#ccc" }}>Password</label>
//           <input
//             type="password"
//             name="password"
//             className="glass-input"
//             placeholder="Create password"
//             value={formData.password}
//             onChange={onChange}
//             required
//           />

//           <button type="submit" className="glass-btn" style={{ marginTop: "1rem" }}>
//             Sign Up
//           </button>
//         </form>

//         <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#aaa" }}>
//           Already have an account?{" "}
//           <Link to="/signin" style={{ color: "#e50914", fontWeight: 600 }}>
//             Sign In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 Auth Context Import Karein

function Signup() {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // 👈 loginUser function lein
  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(formData);
      
      // 🚀 Auto-login user immediately upon successful registration
      loginUser(res.data.data, res.data.token);
      
      // Direct Home page redirect
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

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="userName"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
              placeholder="Choose username"
              value={formData.userName}
              onChange={onChange}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
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
          <Link to="/signin" className="text-red-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;