import Icon from './Icon.jsx';

export function StatusPill({ tone = 'gray', label, icon, dot = false, className = '' }) {
  const tones = {
    emerald: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20',
    'emerald-dot': 'bg-emerald-500',
    amber: 'bg-amber-500/10 text-amber-700 border border-amber-500/20',
    'amber-dot': 'bg-amber-500',
    red: 'bg-red-500/10 text-red-700 border border-red-500/20',
    'red-dot': 'bg-red-500',
    blue: 'bg-blue-100 text-blue-700 border border-blue-200',
    'blue-dot': 'bg-blue-500',
    gray: 'bg-surface-container-high text-on-surface border border-outline-variant',
    'gray-dot': 'bg-gray-400',
    maroon: 'bg-primary-container/10 text-primary-container border border-primary-container/20',
    'maroon-dot': 'bg-primary-container',
    'maroon-solid': 'bg-primary-container text-white',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-bold text-[10px] uppercase tracking-wider whitespace-nowrap ${tones[tone]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${tones[`${tone}-dot`] || 'bg-gray-400'}`} />}
      {icon && <Icon name={icon} size={14} />}
      {label}
    </span>
  );
}

export function FilterChip({ label, active = false, icon, iconRight, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 rounded-full font-label-bold text-label-bold transition-all active:scale-95 ${
        active
          ? 'bg-primary-container text-white shadow-[0_4px_12px_rgba(128,0,0,0.2)]'
          : 'bg-white text-on-surface border border-outline-variant shadow-sm hover:border-primary-container'
      } ${className}`}
    >
      {icon && <Icon name={icon} size={16} />}
      {label}
      {iconRight && <Icon name={iconRight} size={16} />}
    </button>
  );
}

export function AiPill({ label = 'AI', tone = 'dark', className = '' }) {
  const colors =
    tone === 'dark'
      ? 'bg-primary-container/10 text-primary-container ai-glow-dark'
      : 'bg-white/20 text-white ai-glow-light';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-ai-signature text-[11px] font-black uppercase tracking-wider ${colors} ${className}`}
    >
      {label}
    </span>
  );
}

export function PriorityTag({ priority }) {
  const map = {
    critical: 'bg-red-100 text-red-700',
    urgent: 'bg-orange-100 text-orange-700',
    normal: 'bg-gray-100 text-gray-700',
  };
  const label = { critical: 'CRITICAL', urgent: 'URGENT', normal: 'NORMAL' }[priority];
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full font-label-bold text-[10px] tracking-wider ${map[priority]}`}
    >
      {label}
    </span>
  );
}
