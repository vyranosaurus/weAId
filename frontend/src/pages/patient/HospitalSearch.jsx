import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import HospitalCard from '../../components/patient/HospitalCard.jsx';
import { hospitals } from '../../data/hospitals.js';

export default function HospitalSearch() {
  return (
    <PatientShell>
      <PatientHeader
        title="Mga Hospital"
        showBack
        rightAction={<Icon name="local_hospital" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-3 space-y-3 hospital-page-enter">
        {/* Search */}
        <div className="relative">
          <input
            placeholder="Hanapin: ospital, serbisyo, doktor…"
            className="w-full bg-white border border-outline-variant rounded-full px-11 py-2.5 text-[13px] focus:outline-none focus:border-primary-container shadow-card"
          />
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center">
            <Icon name="mic" filled size={16} />
          </button>
        </div>

        {/* Map preview */}
        <Link to="/patient/results" className="block">
          <div className="h-36 rounded-xl bg-gradient-to-br from-tertiary-fixed via-surface-container to-primary-container/20 relative overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="Hospital building"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-3 py-1 rounded-full bg-white/85 text-[10px] font-bold uppercase tracking-wide text-primary-container shadow-sm">
                Ospital malapit sa iyo
              </span>
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white rounded-xl p-2.5 shadow-card flex items-center gap-2">
              <Icon name="location_on" className="text-primary-container" size={18} />
              <div className="flex-1">
                <p className="text-[11px] text-on-surface-variant">Lokasyon ngayon</p>
                <p className="font-bold text-[13px]">Sampaloc, Manila</p>
              </div>
              <button className="text-primary-container text-[11px] font-bold uppercase">
                Baguhin
              </button>
            </div>
          </div>
        </Link>

        {/* Top picks */}
        <section className="space-y-2.5">
          <h3 className="font-bold text-[13px]">Pinaka-malapit</h3>
          {hospitals.map((h, idx) => (
            <HospitalCard key={h.id} hospital={h} compact enterIndex={idx} />
          ))}
          <Link
            to="/patient/results"
            className="block text-center bg-white border border-primary-container text-primary-container py-2.5 rounded-full font-label-bold text-[11px] uppercase"
          >
            Tingnan ang lahat
          </Link>
        </section>
      </main>
    </PatientShell>
  );
}
