import { useParams } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { findHospital } from '../../data/hospitals.js';

const guideSteps = [
  'Mula Sampaloc, dumiretso sa Espana Blvd.',
  'Lumiko sa Taft Avenue at sundan ang pangunahing daan.',
  'Diretso hanggang makita ang hospital drop-off zone.',
];

export default function HospitalDirections() {
  const { id } = useParams();
  const hospital = findHospital(id);

  return (
    <PatientShell hideNav>
      <PatientHeader
        title="Direksyon"
        subtitle={hospital.shortName}
        rightAction={<Icon name="map" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-stack-md space-y-3">
        <section className="relative h-48 rounded-2xl overflow-hidden border border-primary-container/25 shadow-card bg-[linear-gradient(145deg,#f9efef_0%,#fff_35%,#f6e7e7_100%)]">
          <div className="absolute inset-0 opacity-80">
            <div className="absolute top-6 left-0 right-0 h-2 bg-primary-container/15 rotate-[8deg]" />
            <div className="absolute top-24 left-0 right-0 h-2 bg-primary-container/15 -rotate-[6deg]" />
            <div className="absolute left-14 top-0 bottom-0 w-2 bg-primary-container/12" />
            <div className="absolute right-16 top-0 bottom-0 w-2 bg-primary-container/12" />
          </div>

          <div className="absolute left-8 top-28 w-9 h-9 rounded-full bg-primary-container text-white shadow-lg flex items-center justify-center">
            <Icon name="person_pin_circle" size={20} />
          </div>
          <div className="absolute right-8 top-10 w-10 h-10 rounded-full bg-red-700 text-white shadow-lg flex items-center justify-center animate-pulse">
            <Icon name="local_hospital" size={20} />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20 65 C35 60, 48 40, 80 25" stroke="#7A1C1C" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
          </svg>

          <div className="absolute bottom-3 left-3 right-3 bg-white/95 rounded-xl p-2.5 border border-primary-container/20 shadow-sm">
            <p className="text-[11px] font-bold text-on-surface">{hospital.name}</p>
            <p className="text-[10px] text-on-surface-variant">{hospital.distanceKm} km · ~{hospital.etaMin} min biyahe</p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-4 shadow-card space-y-2.5">
          <h3 className="font-bold text-on-surface flex items-center gap-2">
            <Icon name="route" className="text-primary-container" size={18} />
            Simulated na daan
          </h3>
          {guideSteps.map((step, idx) => (
            <div key={step} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-primary-container text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <p className="text-[12px] text-on-surface-variant">{step}</p>
            </div>
          ))}
        </section>
      </main>
    </PatientShell>
  );
}
