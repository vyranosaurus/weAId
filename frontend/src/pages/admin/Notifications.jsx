import { useState } from 'react';
import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { adminNotifications } from '../../data/admin.js';

const sevStyles = {
  critical: { bg: 'bg-red-50', border: 'border-red-300', dot: 'bg-red-500', text: 'text-red-700', icon: 'crisis_alert' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-300', dot: 'bg-amber-500', text: 'text-amber-700', icon: 'warning' },
  info: { bg: 'bg-blue-50', border: 'border-blue-300', dot: 'bg-blue-500', text: 'text-blue-700', icon: 'info' },
};

const tabs = ['Lahat', 'Critical', 'Warning', 'Info', 'AI insights'];

export default function AdminNotifications() {
  const [tab, setTab] = useState('Lahat');

  return (
    <AdminShell breadcrumb="Notifications">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Notifications</h1>
          <p className="text-on-surface-variant text-sm">
            Mga abiso, alerto, at AI insights — live
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            Mark all read
          </button>
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="settings" size={16} className="inline mr-1" /> Preferences
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase ${
              tab === t
                ? 'bg-primary-container text-white shadow-card'
                : 'bg-white border border-outline-variant text-on-surface'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {adminNotifications.map((n) => {
          const s = sevStyles[n.severity];
          const needsAttention = !n.read && (n.severity === 'critical' || n.severity === 'warning');
          return (
            <div
              key={n.id}
              className={`bg-white rounded-xl shadow-card border-l-4 ${s.border} p-4 flex items-start gap-3 ${
                !n.read ? 'border-l-4' : 'opacity-75'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full ${s.bg} ${s.text} flex items-center justify-center shrink-0 ${
                  needsAttention ? 'animate-pulse ring-2 ring-red-200/70' : ''
                }`}
              >
                <Icon name={s.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-bold text-on-surface">{n.title}</p>
                  <span className="text-xs text-on-surface-variant shrink-0">{n.time}</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-1">{n.body}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${s.bg} ${s.text} ${
                      needsAttention ? 'animate-[pulse_1.8s_ease-in-out_infinite]' : ''
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {n.severity}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                    {n.category}
                  </span>
                  {!n.read && (
                    <span className="text-[10px] font-bold text-primary-container uppercase ml-auto">
                      • New
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-primary-container text-white px-3 py-1.5 rounded-full text-[11px] font-bold uppercase">
                  View
                </button>
                <button className="bg-white border border-outline-variant text-on-surface px-3 py-1.5 rounded-full text-[11px] font-bold uppercase">
                  Mark read
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
