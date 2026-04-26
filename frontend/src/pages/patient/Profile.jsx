import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { currentPatient } from '../../data/patients.js';

const menu = [
  { icon: 'medical_information', label: 'Medical info', to: '/patient/profile' },
  { icon: 'family_restroom', label: 'Pamilya', to: '/patient/family' },
  { icon: 'emergency', label: 'Emergency contacts', to: '/patient/emergency' },
  { icon: 'verified', label: 'PhilHealth & HMO', to: '/patient/profile' },
  { icon: 'description', label: 'Medical records', to: '/patient/profile' },
  { icon: 'lightbulb', label: 'Health tips', to: '/patient/tips' },
  { icon: 'settings', label: 'Settings', to: '/patient/settings' },
  { icon: 'help', label: 'Tulong & FAQs', to: '/patient/settings' },
];

export default function Profile() {
  return (
    <PatientShell>
      {/* Hero */}
      <div className="bg-primary-container rounded-b-[20px] shadow-hero text-white px-container-padding pt-12 pb-6 text-center">
        <div className="w-20 h-20 mx-auto bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center text-2xl font-black">
          {currentPatient.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <h1 className="font-display-md text-display-md mt-3">{currentPatient.name}</h1>
        <p className="text-white/80 text-sm">
          {currentPatient.age} taong gulang · {currentPatient.sex} · {currentPatient.city}
        </p>
        <div className="mt-3 flex justify-center gap-2">
          <span className="bg-white/20 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            PhilHealth
          </span>
          <span className="bg-white/20 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            HMO: Maxicare
          </span>
        </div>
      </div>

      <main className="px-container-padding py-stack-lg space-y-stack-md screen-enter">
        {/* Health snapshot */}
        <section className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <Icon name="favorite" className="text-primary-container" filled /> Health snapshot
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] uppercase text-on-surface-variant">Blood type</p>
              <p className="font-bold">{currentPatient.bloodType}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-on-surface-variant">Allergies</p>
              <p className="font-bold">{currentPatient.allergies.join(', ')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-on-surface-variant">Conditions</p>
              <p className="font-bold">{currentPatient.conditions.join(', ')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-on-surface-variant">Meds</p>
              <p className="font-bold">{currentPatient.meds.join(', ')}</p>
            </div>
          </div>
        </section>

        {/* Menu */}
        <section className="bg-white rounded-xl shadow-card overflow-hidden">
          {menu.map((m, i) => (
            <Link
              key={i}
              to={m.to}
              className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/20 last:border-0 hover:bg-surface-variant/30"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <Icon name={m.icon} className="text-primary-container" />
              </div>
              <span className="flex-1 font-bold text-on-surface">{m.label}</span>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </Link>
          ))}
        </section>

        <button className="w-full bg-white border border-red-200 text-red-600 py-3 rounded-xl font-label-bold text-label-bold uppercase">
          Mag-logout
        </button>

        <p className="text-center text-on-surface-variant text-[10px] mt-4">
          weAId v1.0 · Build 2026.04.26
        </p>
      </main>
    </PatientShell>
  );
}
