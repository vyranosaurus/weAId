import { useState } from 'react';
import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { reservations } from '../../data/patientApp.js';

const tabs = [
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusStyles = {
  today: { bg: 'bg-primary-container/10', text: 'text-primary-container', label: 'NGAYON' },
  upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'PAPARATING' },
  past: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'TAPOS' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'CANCELLED' },
};

export default function MySchedule() {
  const [tab, setTab] = useState('today');
  const list = reservations.filter((r) => r.status === tab);

  return (
    <PatientShell>
      <PatientHeader
        title="Inyong iskedyul"
        showBack={false}
        rightAction={
          <button className="p-2 rounded-full hover:bg-white/10">
            <Icon name="filter_list" />
          </button>
        }
      />

      {/* Tabs */}
      <div className="px-container-padding pt-stack-md">
        <div className="flex bg-white rounded-full p-1 shadow-card">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                tab === t.id
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-container-padding py-stack-md space-y-stack-md">
        {list.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-card">
            <Icon name="event_busy" size={48} className="text-on-surface-variant" />
            <h3 className="font-bold mt-2">Wala pang bookings dito</h3>
            <p className="text-on-surface-variant text-sm mt-1">
              Kapag nag-book kayo, dito kayo makikita.
            </p>
            <Link
              to="/patient/triage"
              className="inline-block mt-4 bg-primary-container text-white px-5 py-2 rounded-full text-sm font-bold uppercase"
            >
              Magpa-triage
            </Link>
          </div>
        ) : (
          list.map((r) => {
            const s = statusStyles[r.status];
            return (
              <Link
                key={r.id}
                to={`/patient/reservation/${r.id}`}
                className="block bg-white rounded-xl p-4 shadow-card relative overflow-hidden border border-outline-variant/20 hover:shadow-md transition-all"
              >
                {r.status === 'today' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container" />
                )}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}
                    >
                      {s.label}
                    </span>
                    <h3 className="font-bold text-lg text-on-surface mt-1">{r.service}</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <Icon name="local_hospital" size={14} /> {r.hospitalName}
                    </p>
                  </div>
                  <Icon name="chevron_right" className="text-on-surface-variant shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-outline-variant/30">
                  <div>
                    <p className="text-[10px] uppercase text-on-surface-variant">Petsa</p>
                    <p className="font-bold">{r.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-on-surface-variant">Oras</p>
                    <p className="font-bold text-primary-container">{r.timeSlot}</p>
                  </div>
                </div>

                {r.status === 'today' && (
                  <div className="mt-3 bg-primary-container/5 rounded-lg p-3 flex items-center gap-2 text-xs text-primary-container">
                    <Icon name="schedule" size={16} />
                    <span className="font-bold">{r.timeToSlot} bago ang slot</span>
                  </div>
                )}
              </Link>
            );
          })
        )}
      </main>
    </PatientShell>
  );
}
