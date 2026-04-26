import { NavLink } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const items = [
  { to: '/patient/home', label: 'Home', icon: 'home' },
  { to: '/patient/search', label: 'Hanapin', icon: 'explore' },
  { to: '/patient/emergency', label: 'Emergency', icon: 'emergency', emergency: true },
  { to: '/patient/messages', label: 'Mensahe', icon: 'chat_bubble' },
  { to: '/patient/queue', label: 'Queue', icon: 'queue' },
];

export default function BottomNav({ className = '' }) {
  return (
    <nav
      className={`w-full flex justify-around items-center h-16 px-2 pb-safe glass-surface border-t border-outline-variant/40 shadow-nav-top z-40 ${className}`}
    >
      {items.map((it) => (
        <NavLink
          key={it.to}
          to={it.to}
          className={({ isActive }) =>
            it.emergency
              ? 'relative -mt-6 w-16 h-16 rounded-full bg-red-700 text-white shadow-[0_10px_22px_rgba(185,28,28,0.45)] flex items-center justify-center border-4 border-[#F5F5F5] hover:bg-red-800 transition-all'
              : `relative flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
                  isActive
                    ? 'text-primary-container bg-primary-container/10'
                    : 'text-gray-500 hover:text-primary-container hover:bg-primary-container/5'
                }`
          }
        >
          {({ isActive }) => (
            <>
              {!it.emergency && isActive && <span className="absolute top-0.5 h-0.5 w-7 rounded-full bg-primary-container" />}
              <Icon name={it.icon} size={it.emergency ? 26 : 24} filled={!it.emergency && isActive} />
              <span
                className={
                  it.emergency
                    ? 'absolute -bottom-4 text-[9px] font-extrabold uppercase tracking-[0.08em] text-red-700'
                    : 'text-[10px] font-bold uppercase mt-0.5 tracking-wide'
                }
              >
                {it.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
