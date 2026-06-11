import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        showToast('Login successful! Welcome back.', 'success');
        navigate('/admin', { replace: true });
      } else {
        showToast(result.error || 'Invalid email or password', 'error');
      }
    } catch {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B1220 0%, #2c1810 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-white/5 blur-[60px]" />

      {/* Top bar */}
      <div className="relative z-10 px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-base">NC</div>
          <div>
            <div className="font-extrabold text-sm text-white leading-tight">Naina Cleaning</div>
            <div className="text-[10px] text-surface-muted uppercase tracking-widest">Professional Cleaning</div>
          </div>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-surface-muted no-underline text-sm font-semibold border border-white/10 px-4 py-2 rounded-lg hover:text-white hover:border-white/30 transition-all">
          ← Back to Website
        </Link>
      </div>

      {/* Center card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          {/* Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/40">
              <Shield size={38} color="#fff" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Admin Login</h1>
            <p className="text-surface-muted text-sm">Sign in to access the admin panel</p>
          </div>

          {/* Card */}
          <div className="glass-card p-8 sm:p-10">
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted pointer-events-none" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    className={`input-dark w-full pl-11 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mb-7">
                <label className="block text-xs font-bold text-surface-muted uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-muted pointer-events-none" />
                  <input
                    name="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`input-dark w-full pl-11 pr-11 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer p-0 text-surface-muted hover:text-white transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-3.5 shadow-lg shadow-primary/30"
              >
                {loading ? 'Signing in...' : <><ArrowRight size={17} /> Sign In</>}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-surface-muted text-xs font-bold uppercase tracking-wider">Default Credentials</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Default credentials hint */}
            <div className="rounded-xl p-4 mb-5" style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
              <p className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                <Lock size={12} /> Change after first login
              </p>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm text-white">
                  Email: <code className="ml-1 px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'rgba(14,165,233,0.15)', color: '#7dd3fc' }}>admin@example.com</code>
                </p>
                <p className="text-sm text-white">
                  Password: <code className="ml-1 px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'rgba(14,165,233,0.15)', color: '#7dd3fc' }}>Admin@123</code>
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center gap-5">
              {['Secure Login', 'Admin Only', 'SSL Encrypted'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-teal font-semibold">
                  <CheckCircle size={11} /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const { login, isAuthenticated } = useAuth();
//   const { showToast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) navigate('/admin', { replace: true });
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(p => ({ ...p, [name]: value }));
//     if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.email.trim()) e.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
//     if (!form.password) e.password = 'Password is required';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const result = await login(form.email, form.password);
//       if (result.success) {
//         showToast('Login successful! Welcome back.', 'success');
//         navigate('/admin', { replace: true });
//       } else {
//         showToast(result.error || 'Invalid email or password', 'error');
//       }
//     } catch {
//       showToast('An error occurred. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputBase = {
//     width: '100%', padding: '12px 16px 12px 44px',
//     border: `1px solid ${C.border}`, borderRadius: 10,
//     fontSize: 14, outline: 'none', boxSizing: 'border-box',
//     fontFamily: 'inherit', color: C.text, background: C.white,
//     transition: 'border-color .2s, box-shadow .2s',
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       fontFamily: "'Segoe UI', system-ui, sans-serif",
//       background: `linear-gradient(135deg, ${C.dark} 0%, #2c1810 100%)`,
//       display: 'flex', flexDirection: 'column',
//     }}>

//       {/* Top bar */}
//       <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//         <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
//           <div style={{ width: 38, height: 38, borderRadius: 9, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 15 }}>NC</div>
//           <div>
//             <div style={{ fontWeight: 800, fontSize: 14, color: '#fff', lineHeight: 1.2 }}>Naina Cleaning</div>
//             <div style={{ fontSize: 10, color: '#8892a0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Professional Cleaning</div>
//           </div>
//         </Link>
//         <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8892a0', textDecoration: 'none', fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, padding: '7px 14px', transition: 'color .2s' }}
//           onMouseEnter={e => e.currentTarget.style.color = '#fff'}
//           onMouseLeave={e => e.currentTarget.style.color = '#8892a0'}
//         >
//           ← Back to Website
//         </Link>
//       </div>

//       {/* Center card */}
//       <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
//         <div style={{ width: '100%', maxWidth: 440 }}>

//           {/* Icon */}
//           <div style={{ textAlign: 'center', marginBottom: 32 }}>
//             <div style={{ width: 72, height: 72, borderRadius: 20, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 12px 40px rgba(192,57,43,.4)' }}>
//               <Shield size={34} color="#fff" />
//             </div>
//             <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 8px' }}>Admin Login</h1>
//             <p style={{ color: '#8892a0', fontSize: 14, margin: 0 }}>Sign in to access the admin panel</p>
//           </div>

//           {/* Card */}
//           <div style={{ background: C.white, borderRadius: 20, padding: '36px 32px', boxShadow: '0 24px 80px rgba(0,0,0,.4)' }}>
//             <form onSubmit={handleSubmit}>

//               {/* Email */}
//               <div style={{ marginBottom: 20 }}>
//                 <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
//                   Email Address
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <Mail size={16} color={C.muted} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="admin@example.com"
//                     style={{ ...inputBase, borderColor: errors.email ? '#ef4444' : C.border }}
//                     onFocus={e => { e.target.style.borderColor = C.red; e.target.style.boxShadow = '0 0 0 3px rgba(192,57,43,.1)'; }}
//                     onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : C.border; e.target.style.boxShadow = 'none'; }}
//                   />
//                 </div>
//                 {errors.email && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 5 }}>{errors.email}</p>}
//               </div>

//               {/* Password */}
//               <div style={{ marginBottom: 28 }}>
//                 <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
//                   Password
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <Lock size={16} color={C.muted} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
//                   <input
//                     name="password"
//                     type={showPass ? 'text' : 'password'}
//                     value={form.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     style={{ ...inputBase, paddingRight: 44, borderColor: errors.password ? '#ef4444' : C.border }}
//                     onFocus={e => { e.target.style.borderColor = C.red; e.target.style.boxShadow = '0 0 0 3px rgba(192,57,43,.1)'; }}
//                     onBlur={e => { e.target.style.borderColor = errors.password ? '#ef4444' : C.border; e.target.style.boxShadow = 'none'; }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPass(s => !s)}
//                     style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: C.muted }}
//                   >
//                     {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//                 {errors.password && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 5 }}>{errors.password}</p>}
//               </div>

//               {/* Submit button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                   background: loading ? '#e57368' : C.red, color: '#fff', border: 'none',
//                   borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 15,
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   transition: 'background .2s', boxShadow: '0 4px 16px rgba(192,57,43,.35)',
//                 }}
//               >
//                 {loading ? 'Signing in...' : <><ArrowRight size={17} /> Sign In</>}
//               </button>
//             </form>

//             {/* Divider */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
//               <div style={{ flex: 1, height: 1, background: C.border }} />
//               <span style={{ color: C.muted, fontSize: 12, fontWeight: 600 }}>DEFAULT CREDENTIALS</span>
//               <div style={{ flex: 1, height: 1, background: C.border }} />
//             </div>

//             {/* Default credentials hint */}
//             <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '16px' }}>
//               <p style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
//                 <Lock size={12} /> Change after first login
//               </p>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                 <p style={{ fontSize: 13, color: '#0c4a6e', margin: 0 }}>
//                   Email: <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>admin@example.com</code>
//                 </p>
//                 <p style={{ fontSize: 13, color: '#0c4a6e', margin: 0 }}>
//                   Password: <code style={{ background: '#e0f2fe', padding: '2px 6px', borderRadius: 4, fontWeight: 600 }}>Admin@123</code>
//                 </p>
//               </div>
//             </div>

//             {/* Trust badges */}
//             <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
//               {['Secure Login', 'Admin Only', 'SSL Encrypted'].map(t => (
//                 <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: C.muted, fontWeight: 600 }}>
//                   <CheckCircle size={11} color="#27ae60" /> {t}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
