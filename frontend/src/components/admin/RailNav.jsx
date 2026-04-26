import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Icon from '../shared/Icon.jsx';
import Wordmark from '../shared/Wordmark.jsx';

const items = [
  { to: '/admin', label: 'Overview', icon: 'dashboard', end: true },
  { to: '/admin/queue', label: 'Live Queue', icon: 'pending_actions' },
  { to: '/admin/messages', label: 'Messages', icon: 'chat_bubble' },
  { to: '/admin/incoming', label: 'Incoming', icon: 'emergency' },
  { to: '/admin/profile', label: 'Hospital Profile', icon: 'local_hospital' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export default function RailNav() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav
      className={`hidden md:flex flex-col h-full bg-white border-r border-outline-variant/30 shadow-sm shadow-primary-container/5 z-50 flex-shrink-0 transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`border-b border-outline-variant/30 flex items-center ${collapsed ? 'p-3 justify-center' : 'p-5 gap-2.5'}`}>
        <div className={`rounded-full bg-primary-container flex items-center justify-center ${collapsed ? 'w-10 h-10' : 'w-9 h-9'}`}>
          <Icon name="local_hospital" className="text-white" size={collapsed ? 22 : 20} />
        </div>
        <div className={`transition-all duration-300 ease-out ${collapsed ? 'w-0 opacity-0 -translate-x-1 overflow-hidden' : 'w-auto opacity-100 translate-x-0'}`}>
          <Wordmark size="sm" tone="dark" />
          <p className="font-label-bold text-[9px] text-on-surface-variant uppercase tracking-[0.14em]">
            Hospital Admin
          </p>
        </div>
      </div>

      <div className={`px-3 py-2 border-b border-outline-variant/20 ${collapsed ? 'flex justify-center' : 'flex items-center justify-end'}`}>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className={`h-8 rounded-full border border-outline-variant/40 text-primary-container hover:bg-primary-container/8 hover:border-primary-container/40 flex items-center justify-center transition-all duration-300 ease-out ${
            collapsed ? 'w-8' : 'w-8'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name={collapsed ? 'chevron_right' : 'chevron_left'} size={18} />
        </button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              `flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-6'} py-3 font-label-bold text-label-bold transition-all duration-300 ease-out border-l-4 ${
                isActive
                  ? 'text-primary-container bg-primary-container/12 border-primary-container'
                  : 'text-on-surface-variant border-transparent hover:text-primary-container hover:bg-surface-variant/50'
              }`
            }
            title={collapsed ? it.label : undefined}
          >
            {({ isActive }) => (
              <>
                <Icon name={it.icon} filled={isActive} />
                <span
                  className={`transition-all duration-250 ease-out whitespace-nowrap ${
                    collapsed ? 'w-0 opacity-0 -translate-x-1 overflow-hidden' : 'w-auto opacity-100 translate-x-0'
                  }`}
                >
                  {it.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
      {!collapsed ? (
        <div className="p-4 border-t border-outline-variant/30 text-[10px] text-on-surface-variant uppercase tracking-wider flex items-center justify-between">
          <span>v1.0 · weAId</span>
          <a href="#" className="hover:text-primary-container">
            Help
          </a>
        </div>
      ) : (
        <div className="p-3 border-t border-outline-variant/30 flex justify-center">
          <a href="#" className="w-8 h-8 rounded-full text-on-surface-variant hover:text-primary-container hover:bg-surface-variant/50 flex items-center justify-center" title="Help">
            <Icon name="help_outline" size={18} />
          </a>
        </div>
      )}
    </nav>
  );
}
