import { Link } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { incomingPatients, priorityStyles } from '../../data/patients.js';

const buckets = [
  { label: '9:00 - 9:30 AM', count: 2, summary: '1 critical, 1 urgent' },
  { label: '9:30 - 10:00 AM', count: 2, summary: '2 normal' },
  { label: '10:00 - 10:30 AM', count: 1, summary: '1 normal' },
  { label: '10:30 - 11:00 AM', count: 0, summary: 'Walang naka-book' },
];

export default function Incoming() {
  return (
    <AdminShell breadcrumb="Incoming">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Incoming Patients</h1>
          <p className="text-on-surface-variant text-sm">
            Mga pasyenteng paparating mula sa weAId · live ETA
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="map" size={16} className="inline mr-1" /> Map view
          </button>
          <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="schedule" size={16} className="inline mr-1" /> Open all
          </button>
        </div>
      </div>

      {/* Time buckets summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {buckets.map((b) => (
          <div key={b.label} className="bg-white rounded-xl p-3 shadow-card border border-outline-variant/20">
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
              {b.label}
            </p>
            <p className="text-2xl font-bold text-primary-container mt-1">{b.count}</p>
            <p className="text-xs text-on-surface-variant">{b.summary}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-stack-md">
        {Array.from(new Set(incomingPatients.map((p) => p.bucket))).map((bucket) => (
          <section key={bucket}>
            <h3 className="font-bold text-on-surface mb-2 flex items-center gap-2">
              <Icon name="schedule" className="text-primary-container" /> {bucket}
            </h3>
            <div className="grid gap-3">
              {incomingPatients
                .filter((p) => p.bucket === bucket)
                .map((p) => {
                  const s = priorityStyles[p.priority];
                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-4 grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-start gap-2 md:gap-1">
                        <span className="font-display-md text-display-md text-primary-container">
                          {p.etaMin}m
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          {p.distanceKm} km away
                        </span>
                      </div>
                      <div className="col-span-12 md:col-span-5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`/admin/patient/${p.id}`}
                            className="font-bold text-on-surface hover:text-primary-container"
                          >
                            {p.name}
                          </Link>
                          <span className="text-[10px] font-ai-signature font-black text-primary-container ai-glow-dark">
                            AI
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}
                          >
                            {s.label}
                          </span>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                          {p.age} y/o · {p.sex} · {p.cost}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate mt-1">
                          <Icon name="psychology" size={12} className="inline mr-0.5" />{' '}
                          {p.triageSummary}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-3 text-sm">
                        <p className="text-[10px] uppercase text-on-surface-variant font-bold">
                          Booked for
                        </p>
                        <p className="font-bold">{p.service}</p>
                      </div>
                      <div className="col-span-12 md:col-span-2 flex md:flex-col gap-2 justify-end">
                        <button className="flex-1 bg-primary-container text-white py-2 rounded-full text-xs font-bold uppercase">
                          Send msg
                        </button>
                        <button className="bg-white border border-outline-variant text-on-surface px-3 py-2 rounded-full text-xs font-bold uppercase">
                          More
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      <div className="bg-white border border-primary-container/30 rounded-xl p-4 flex items-start gap-3">
        <span className="font-ai-signature font-black text-primary-container text-2xl ai-glow-dark mt-0.5">
          AI
        </span>
        <div>
          <p className="font-bold text-on-surface">Forecast: +18 incoming sa 11AM-12PM</p>
          <p className="text-sm text-on-surface-variant">
            Suggest opening 1 more triage station para sa OB-GYN at Pediatrics.
          </p>
        </div>
        <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase ml-auto self-center">
          Apply
        </button>
      </div>
    </AdminShell>
  );
}
