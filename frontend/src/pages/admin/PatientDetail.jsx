import { useParams } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { queuePatients, priorityStyles } from '../../data/patients.js';

const triageTimeline = [
  { time: '8:12 AM', text: 'Pasyente nag-input ng symptoms sa weAId chat.', icon: 'chat' },
  { time: '8:13 AM', text: 'AI nag-recommend: OB-GYN consultation, urgent.', icon: 'smart_toy' },
  { time: '8:14 AM', text: 'Naka-book sa PGH 10:30 AM slot.', icon: 'event_available' },
  { time: '8:18 AM', text: 'Umalis na sa bahay (1.4 km away, ETA 12 min).', icon: 'directions_walk' },
  { time: '8:42 AM', text: 'Nakarating sa PGH at na-check-in.', icon: 'check_circle' },
  { time: '9:04 AM', text: 'Inilipat sa OB-GYN OPD Room 3.', icon: 'meeting_room' },
];

export default function AdminPatientDetail() {
  const { id } = useParams();
  const p = queuePatients.find((x) => x.id === id) || queuePatients[0];
  const sP = priorityStyles[p.priority];

  return (
    <AdminShell breadcrumb={`Patient · ${p.name}`}>
      {/* Header card */}
      <div className="bg-white rounded-2xl p-stack-lg shadow-card border-l-4 border-primary-container flex flex-col md:flex-row gap-4 items-start">
        <div className="w-16 h-16 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center text-2xl font-bold">
          {p.name[0]}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display-md text-display-md">{p.name}</h1>
            <span className="font-ai-signature font-black text-primary-container ai-glow-dark text-xl">
              AI
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-1 rounded-full ${sP.bg} ${sP.text}`}
            >
              {sP.label}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm">
            #{p.id} · {p.age} y/o · {p.sex} · PhilHealth ✓
          </p>
          <p className="text-on-surface mt-2">{p.complaint}</p>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="bg-primary-container text-white px-5 py-2 rounded-full text-xs font-bold uppercase shadow-card">
            <Icon name="campaign" size={16} className="inline mr-1" /> Tawagin
          </button>
          <button className="bg-white border border-outline-variant text-on-surface px-5 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="chat" size={16} className="inline mr-1" /> Magmensahe
          </button>
          <button className="bg-white border border-red-500 text-red-600 px-5 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="flag" size={16} className="inline mr-1" /> I-flag
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Vitals + medical */}
        <div className="lg:col-span-2 space-y-4">
          {/* AI summary */}
          <div className="bg-white rounded-xl shadow-card border border-primary-container/20 p-5">
            <h3 className="font-headline-sm text-headline-sm flex items-center gap-2 mb-3">
              <span className="font-ai-signature font-black text-primary-container ai-glow-dark">
                AI
              </span>{' '}
              Triage Summary
            </h3>
            <p className="text-sm text-on-surface">
              <strong>Maria Santos, 34 F</strong>, presenting with <strong>severe abdominal pain</strong>{' '}
              (7/10) for 2 days, accompanied by <strong>fever (38°C)</strong>. No vomiting or diarrhea
              reported. No bleeding. Allergy: <strong>Penicillin</strong>. PhilHealth-covered.
            </p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase px-2 py-1 rounded-full">
                Recommend: OB-GYN consult
              </span>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase px-2 py-1 rounded-full">
                Watch: appendicitis
              </span>
            </div>
          </div>

          {/* Vitals */}
          <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-5">
            <h3 className="font-headline-sm text-headline-sm mb-3">Vitals (intake)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <Vital label="BP" value="118/76" />
              <Vital label="HR" value="92" unit="bpm" />
              <Vital label="Temp" value="38.1" unit="°C" warn />
              <Vital label="O2 Sat" value="98%" />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-5">
            <h3 className="font-headline-sm text-headline-sm mb-4">weAId Journey</h3>
            <ol className="relative border-l-2 border-primary-container/30 ml-3 space-y-4">
              {triageTimeline.map((t, i) => (
                <li key={i} className="ml-5 relative">
                  <span className="absolute -left-[26px] top-1 w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center">
                    <Icon name={t.icon} size={12} />
                  </span>
                  <p className="text-xs text-on-surface-variant">{t.time}</p>
                  <p className="text-sm text-on-surface">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right: Profile sidebar */}
        <aside className="space-y-4">
          <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-5">
            <h3 className="font-bold mb-3">Insurance & Identity</h3>
            <FieldRow label="PhilHealth" value="01-23456789-0" />
            <FieldRow label="HMO" value="Maxicare · #1234" />
            <FieldRow label="Govt ID" value="Driver's License" />
            <FieldRow label="Address" value="Sampaloc, Manila" />
            <FieldRow label="Emergency contact" value="Ricardo Santos · 0917-555-0188" />
          </div>

          <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-5">
            <h3 className="font-bold mb-3">Medical history</h3>
            <FieldRow label="Allergies" value="Penicillin" warn />
            <FieldRow label="Conditions" value="Mild asthma" />
            <FieldRow label="Meds" value="Salbutamol PRN" />
            <FieldRow label="Blood type" value="O+" />
            <FieldRow label="Last visit" value="Mayo 28, 2025 · OB-GYN" />
          </div>

          <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 p-5">
            <h3 className="font-bold mb-3">Doctor's notes</h3>
            <textarea
              placeholder="Magsulat ng note dito (privado, hindi naka-share sa pasyente)…"
              rows={4}
              className="w-full bg-[#F5F5F5] border border-outline-variant rounded-lg p-3 text-sm focus:outline-none focus:border-primary-container"
            />
            <button className="mt-2 bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
              I-save ang note
            </button>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function Vital({ label, value, unit, warn }) {
  return (
    <div className="bg-surface-variant/30 rounded-lg p-3">
      <p className="text-[10px] uppercase text-on-surface-variant tracking-wider">{label}</p>
      <p className={`font-bold text-lg ${warn ? 'text-red-600' : 'text-on-surface'}`}>
        {value} {unit && <span className="text-xs font-normal">{unit}</span>}
      </p>
    </div>
  );
}

function FieldRow({ label, value, warn }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-outline-variant/20 last:border-0">
      <span className="text-xs text-on-surface-variant uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold text-right ${warn ? 'text-red-600' : 'text-on-surface'}`}>
        {value}
      </span>
    </div>
  );
}
