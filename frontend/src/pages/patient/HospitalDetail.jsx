import { useParams, Link, useNavigate } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { StatusPill } from '../../components/shared/Pills.jsx';
import { findHospital, queueColors } from '../../data/hospitals.js';

const slots = [
  { label: '8:30 AM', avail: false },
  { label: '9:00 AM', avail: false },
  { label: '9:30 AM', avail: true },
  { label: '10:00 AM', avail: true },
  { label: '10:30 AM', avail: true, recommended: true },
  { label: '11:00 AM', avail: true },
  { label: '11:30 AM', avail: false },
  { label: '12:00 NN', avail: true },
];

export default function HospitalDetail() {
  const { id } = useParams();
  const hospital = findHospital(id);
  const q = queueColors[hospital.queueLevel];
  const navigate = useNavigate();

  return (
    <PatientShell hideNav>
      <PatientHeader
        title={hospital.shortName}
        subtitle={hospital.type}
        rightAction={
          <button className="p-2 rounded-full hover:bg-white/10">
            <Icon name="favorite_border" />
          </button>
        }
      />

      <main className="pb-6 -mt-2">
        {/* Hero photo */}
        <div className="relative h-44 bg-gradient-to-br from-primary-container/80 to-[#400000] flex items-end">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
            alt={`${hospital.name} building`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/78 to-[#400000]/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="relative px-container-padding pb-3 text-white w-full">
            <h1 className="font-display-md text-display-md leading-tight">{hospital.name}</h1>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <Icon name="location_on" size={16} /> {hospital.address}
            </p>
          </div>
        </div>

        {/* Status row */}
        <div className="px-container-padding mt-2">
          <div className="bg-white rounded-xl shadow-card p-4 grid grid-cols-3 gap-2 text-center">
            <div>
              <Icon name="people" className="text-primary-container" />
              <p className="text-display-md font-bold text-on-surface">{hospital.queueCount}</p>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Sa pila</p>
            </div>
            <div className="border-x border-outline-variant/40">
              <Icon name="schedule" className="text-primary-container" />
              <p className="text-display-md font-bold text-on-surface">~{hospital.queueWaitMin}m</p>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Hintayan</p>
            </div>
            <div>
              <Icon name="directions" className="text-primary-container" />
              <p className="text-display-md font-bold text-on-surface">{hospital.etaMin}m</p>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Travel</p>
            </div>
          </div>
        </div>

        <div className="px-container-padding mt-stack-lg space-y-stack-lg">
          {/* Queue badge */}
          <div className={`flex items-center gap-2 ${q.bg} ${q.text} px-3 py-2 rounded-full w-fit`}>
            <span className={`w-2 h-2 rounded-full ${q.dot}`} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {hospital.queueLabel}
            </span>
          </div>

          {/* Quick info pills */}
          <div className="flex flex-wrap gap-2">
            {hospital.cost.map((c) =>
              c === 'LIBRE' || c === 'LIBRE KONSULTA' ? (
                <StatusPill key={c} tone="emerald" label={c} icon="check_circle" />
              ) : c === 'PHILHEALTH' ? (
                <StatusPill key={c} tone="blue" label="PHILHEALTH" icon="verified" />
              ) : (
                <StatusPill key={c} tone="gray" label={c} />
              ),
            )}
            {hospital.open24h && <StatusPill tone="gray" label="24 ORAS" icon="schedule" />}
          </div>

          {/* Services */}
          <section className="bg-white rounded-xl p-4 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Icon name="medical_services" className="text-primary-container" /> Mga serbisyo
              </h3>
              <Link
                to={`/patient/hospital/${hospital.id}/services`}
                className="text-primary-container text-[11px] font-extrabold uppercase tracking-wide hover:underline"
              >
                Tingnan
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {hospital.services.map((s) => (
                <span
                  key={s}
                  className="bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-xs font-bold"
                >
                  {s}
                </span>
              ))}
            </div>
            {hospital.capacityNote && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2 text-xs text-amber-700">
                <Icon name="warning" size={16} />
                <span>{hospital.capacityNote}</span>
              </div>
            )}
          </section>

          {/* Facilities */}
          <section className="bg-white rounded-xl p-4 shadow-card">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="accessible" className="text-primary-container" /> Pasilidad
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-on-surface-variant">
              {hospital.facilities.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-emerald-500" size={16} />
                  {f}
                </div>
              ))}
            </div>
          </section>

          {/* Schedule */}
          <section className="bg-white rounded-xl p-4 shadow-card">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="event_available" className="text-primary-container" /> Pumili ng oras
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select className="w-full border border-outline-variant rounded-xl px-3 py-2 text-sm font-semibold bg-white outline-none focus:border-primary-container">
                <option>June 2026</option>
                <option>July 2026</option>
                <option>August 2026</option>
              </select>
              <select className="w-full border border-outline-variant rounded-xl px-3 py-2 text-sm font-semibold bg-white outline-none focus:border-primary-container">
                <option>Week 2</option>
                <option>Week 3</option>
                <option>Week 4</option>
              </select>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {['14', '15', '16', '17', '18'].map((d, i) => (
                <button
                  key={d}
                  className={`py-2 rounded-xl text-sm font-bold ${
                    i === 0
                      ? 'bg-primary-container text-white'
                      : 'bg-surface-variant/40 text-on-surface'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((s) => (
                <button
                  key={s.label}
                  disabled={!s.avail}
                  onClick={() => navigate('/patient/booking/confirm')}
                  className={`relative py-3 rounded-xl text-sm font-bold transition-all ${
                    !s.avail
                      ? 'bg-gray-100 text-gray-400 line-through cursor-not-allowed'
                      : s.recommended
                      ? 'bg-primary-container text-white shadow-card'
                      : 'bg-white border border-primary-container text-primary-container hover:bg-primary-container/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                to="/patient/booking/confirm"
                className="flex-1 bg-primary-container text-white font-label-bold text-label-bold uppercase py-3 rounded-full shadow-card flex justify-center items-center gap-2 active:scale-95"
              >
                Mag-book sa 10:30 AM
              </Link>
              <button className="w-12 h-12 bg-white border-2 border-primary-container text-primary-container rounded-full flex items-center justify-center">
                <Icon name="directions" />
              </button>
            </div>
          </section>

        </div>
      </main>

    </PatientShell>
  );
}
