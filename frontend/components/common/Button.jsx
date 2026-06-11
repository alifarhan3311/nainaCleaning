import React from 'react';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:   { background: '#2563eb', color: '#fff', border: 'none' },
  secondary: { background: '#f1f5f9', color: '#374151', border: 'none' },
  outline:   { background: 'transparent', color: '#2563eb', border: '2px solid #2563eb' },
  danger:    { background: '#dc2626', color: '#fff', border: 'none' },
};
const SIZES = {
  sm: { padding: '6px 12px', fontSize: 12 },
  md: { padding: '9px 18px', fontSize: 14 },
  lg: { padding: '12px 24px', fontSize: 16 },
};

const Button = ({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false,
  icon: Icon, onClick, type = 'button',
  style: extraStyle = {}, ...props
}) => {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        fontWeight: 600, borderRadius: 8, cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.55 : 1,
        fontFamily: 'inherit', transition: 'opacity .15s, background .15s',
        ...v, ...s, ...extraStyle,
      }}
      {...props}
    >
      {loading && <Loader2 size={14} style={{ animation: 'spin .7s linear infinite' }} />}
      {Icon && !loading && <Icon size={14} />}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
};

export default Button;
