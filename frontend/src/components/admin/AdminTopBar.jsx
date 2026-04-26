import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import { adminUser } from '../../data/admin.js';

export default function AdminTopBar({ breadcrumb }) {
  return (
    <header className="flex justify-between items-center h-16 px-6 w-full glass-surface border-b border-outline-variant/30 shadow-sm shadow-primary-container/5 z-40 flex-shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <button className="md:hidden text-primary-container hover:bg-surface-variant/50 p-2 rounded-full transition-colors">
          <Icon name="menu" />
        </button>
        <div className="hidden sm:flex items-center gap-2 font-body-md text-body-md text-on-surface-variant min-w-0">
          <span className="font-headline-sm text-headline-sm text-primary-container truncate" title="Current hospital (fixed)">
            {adminUser.hospital}
          </span>
          <Icon name="chevron_right" size={16} className="shrink-0" />
          <span className="font-label-bold text-label-bold text-primary-container truncate">
            {breadcrumb}
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative flex items-center w-full h-10 rounded-full bg-surface-variant/30 border border-outline-variant/50 focus-within:border-primary-container focus-within:bg-white transition-colors px-4">
          <Icon name="search" className="text-on-surface-variant mr-2" size={20} />
          <input
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60"
            placeholder="Search patients, services, staff…"
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/notifications"
          className="relative text-primary-container hover:bg-surface-variant/50 p-2 rounded-full transition-colors"
        >
          <Icon name="notifications" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white" />
        </Link>
        <button className="text-primary-container hover:bg-surface-variant/50 p-2 rounded-full transition-colors hidden sm:block">
          <Icon name="help_outline" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
          <div className="w-8 h-8 rounded-full bg-primary-container/20 border border-primary-container/30 flex items-center justify-center">
            <Icon name="person" className="text-primary-container" size={20} />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-[12px] font-bold text-on-surface">{adminUser.name}</div>
            <div className="text-[10px] text-on-surface-variant uppercase">{adminUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
