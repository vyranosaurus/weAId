import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { findHospital } from '../../data/hospitals.js';

const coreServices = [
  'Emergency Medicine',
  'Internal Medicine',
  'Pediatrics',
  'OB-GYN',
  'General Surgery',
  'Family Medicine',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pulmonology',
  'Orthopedics',
  'ENT',
  'Nephrology',
  'Endocrinology',
  'Infectious Disease',
];

const diagnostics = [
  'Laboratory',
  'X-Ray',
  'Ultrasound',
  'CT Scan',
  'MRI',
  'ECG',
  '2D Echo',
  'Urinalysis',
];

export default function HospitalServices() {
  const { id } = useParams();
  const hospital = findHospital(id);
  const [query, setQuery] = useState('');

  const allServices = Array.from(new Set([...hospital.services, ...coreServices]));
  const filteredServices = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return allServices;
    return allServices.filter((service) => service.toLowerCase().includes(keyword));
  }, [allServices, query]);

  return (
    <PatientShell hideNav>
      <PatientHeader
        title="Mga Serbisyo"
        subtitle={hospital.shortName}
        rightAction={<Icon name="medical_services" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-stack-md space-y-3 hospital-page-enter">
        <section className="bg-gradient-to-br from-primary-container/8 to-white rounded-xl border border-primary-container/20 p-4 shadow-card">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-primary-container">
            {hospital.name}
          </p>
          <h2 className="font-headline-sm text-headline-sm font-extrabold text-on-surface mt-1">
            Available na serbisyo
          </h2>
          <p className="text-[12px] text-on-surface-variant mt-1">
            Piliin ang tamang serbisyo bago mag-book para mas mabilis ang triage.
          </p>
        </section>

        <section className="bg-white rounded-xl p-4 shadow-card">
          <div className="relative mb-3">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Maghanap ng serbisyo..."
              className="w-full border border-outline-variant rounded-xl pl-9 pr-3 py-2 text-[12px] outline-none focus:border-primary-container bg-white"
            />
          </div>
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Icon name="local_hospital" className="text-primary-container" size={18} />
            Pangunahing serbisyo
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {filteredServices.map((service) => (
              <div
                key={service}
                className="rounded-lg border border-primary-container/20 bg-primary-container/5 px-3 py-2 text-[12px] font-semibold text-on-surface"
              >
                {service}
              </div>
            ))}
          </div>
          {filteredServices.length === 0 && (
            <p className="text-[12px] text-on-surface-variant mt-2">Walang tumugmang serbisyo sa hinanap mo.</p>
          )}
        </section>

        <section className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Icon name="biotech" className="text-primary-container" size={18} />
            Diagnostics at tests
          </h3>
          <div className="flex flex-wrap gap-2">
            {diagnostics.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-surface-container px-3 py-1.5 text-[11px] font-bold text-on-surface-variant"
              >
                <Icon name="check_circle" size={14} className="text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <Link
          to={`/patient/hospital/${hospital.id}`}
          className="block w-full text-center bg-primary-container text-white py-3 rounded-full font-label-bold text-label-bold uppercase shadow-card"
        >
          Bumalik sa hospital details
        </Link>
      </main>
    </PatientShell>
  );
}
