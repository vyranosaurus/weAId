import { Link } from 'react-router-dom';

const baseBtn =
  'inline-flex items-center justify-center gap-2 font-label-bold text-label-bold uppercase rounded-full transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed';
const sizes = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-5 py-3 text-label-bold',
  lg: 'px-6 py-4 text-label-bold',
};

function ButtonInner({ children, icon, iconRight, className = '', size = 'md', variant, ...rest }) {
  const variants = {
    primary: 'bg-primary-container text-white shadow-card hover:bg-[#600000] hover:shadow-hero',
    'primary-on-dark': 'bg-white text-primary-container shadow-card hover:bg-surface-variant hover:shadow-hero',
    outline:
      'bg-white text-primary-container border-2 border-primary-container hover:bg-primary-container/5',
    'outline-on-dark':
      'bg-transparent text-white border-2 border-white/70 hover:bg-white/10',
    ghost: 'bg-transparent text-primary-container hover:bg-primary-container/10',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-hero',
    'danger-outline':
      'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50',
    muted: 'bg-surface-variant text-on-surface-variant cursor-not-allowed',
  };
  return (
    <button
      className={`${baseBtn} ${sizes[size]} ${variants[variant] || variants.primary} ${className}`}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

export function PrimaryButton(props) {
  return <ButtonInner variant="primary" {...props} />;
}

export function OutlineButton(props) {
  return <ButtonInner variant="outline" {...props} />;
}

export function PrimaryOnDarkButton(props) {
  return <ButtonInner variant="primary-on-dark" {...props} />;
}

export function OutlineOnDarkButton(props) {
  return <ButtonInner variant="outline-on-dark" {...props} />;
}

export function GhostButton(props) {
  return <ButtonInner variant="ghost" {...props} />;
}

export function DangerButton(props) {
  return <ButtonInner variant="danger" {...props} />;
}

export function DangerOutlineButton(props) {
  return <ButtonInner variant="danger-outline" {...props} />;
}

export function MutedButton(props) {
  return <ButtonInner variant="muted" {...props} />;
}

export function LinkButton({ to, children, variant = 'primary', size = 'md', icon, iconRight, className = '' }) {
  const variants = {
    primary: 'bg-primary-container text-white shadow-card hover:bg-[#600000] hover:shadow-hero',
    'primary-on-dark': 'bg-white text-primary-container shadow-card hover:bg-surface-variant hover:shadow-hero',
    outline:
      'bg-white text-primary-container border-2 border-primary-container hover:bg-primary-container/5',
    'outline-on-dark':
      'bg-transparent text-white border-2 border-white/70 hover:bg-white/10',
    ghost: 'bg-transparent text-primary-container hover:bg-primary-container/10',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  return (
    <Link
      to={to}
      className={`${baseBtn} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}

export function CircleIconButton({ icon, onClick, tone = 'maroon', size = 36, className = '', ...rest }) {
  const tones = {
    maroon: 'bg-primary-container text-white shadow-card hover:bg-[#600000]',
    white: 'bg-white text-primary-container shadow-card hover:bg-surface-variant',
    'white-on-dark': 'bg-white/20 text-white hover:bg-white/30',
    transparent: 'bg-transparent text-on-surface hover:bg-black/5',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full transition-all active:scale-95 ${tones[tone]} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      {...rest}
    >
      {icon}
    </button>
  );
}
