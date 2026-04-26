import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { reservations } from '../../data/patientApp.js';

const today = reservations.find((r) => r.status === 'today');

export default function BookingConfirmation() {
  return (
    <PatientShell hideNav>
      {/* Hero (success) */}
      <div className="bg-emerald-600 text-white rounded-b-[20px] shadow-hero px-container-padding pt-12 pb-10 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 animate-pulse-slow">
            <Icon name="check_circle" filled size={48} />
          </div>
          <h1 className="font-display-md text-display-md">Naka-book na po!</h1>
          <p className="text-white/90 mt-1">Salamat sa pagtitiwala sa weAId.</p>
          <p className="text-xs text-white/70 mt-2 font-mono">{today.id}</p>
        </div>
      </div>

      <main className="px-container-padding py-stack-lg space-y-stack-lg">
        {/* Big card */}
        <div className="bg-white rounded-2xl p-stack-lg shadow-card border border-outline-variant/30">
          <span className="inline-block bg-primary-container/10 text-primary-container text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {today.cost}
          </span>
          <h2 className="font-display-md text-display-md mt-2 text-on-surface">{today.service}</h2>
          <p className="text-on-surface-variant flex items-center gap-1 mt-1">
            <Icon name="local_hospital" size={16} />
            {today.hospitalName}
          </p>

          <div className="grid grid-cols-2 gap-stack-md mt-stack-lg">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Petsa</p>
              <p className="font-bold text-on-surface text-lg">{today.date}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">Oras</p>
              <p className="font-bold text-primary-container text-lg">{today.timeSlot}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                Sa pila ngayon
              </p>
              <p className="font-bold text-on-surface">{today.queueNow} pasyente</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                Oras ng pagdating
              </p>
              <p className="font-bold text-on-surface">~{today.waitOnArrival} min hintayan</p>
            </div>
          </div>

          {/* QR placeholder */}
          <div className="mt-stack-lg flex flex-col items-center bg-[#F5F5F5] rounded-xl p-4">
            <div className="w-32 h-32 bg-white border-2 border-primary-container/30 rounded-lg flex items-center justify-center">
              <Icon name="qr_code_2" size={96} className="text-primary-container" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mt-3">
              Ipakita sa pagdating
            </p>
            <p className="font-bold font-mono text-on-surface">{today.id}</p>
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="font-bold flex items-center gap-2 text-amber-900">
            <Icon name="info" /> Mga paalala
          </h4>
          <ul className="text-sm text-amber-900/80 mt-2 space-y-1 list-disc list-inside">
            <li>Magdala ng valid ID at PhilHealth card.</li>
            <li>Pumunta 15 min bago ang inyong slot.</li>
            <li>Kung hindi makakapunta, i-cancel para may iba pang makagamit.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-stack-sm">
          <Link
            to="/patient/schedule"
            className="bg-white border-2 border-primary-container text-primary-container py-3 rounded-full font-label-bold text-label-bold uppercase text-center"
          >
            Tingnan sa schedule
          </Link>
          <button className="bg-primary-container text-white py-3 rounded-full font-label-bold text-label-bold uppercase shadow-card flex justify-center items-center gap-2">
            <Icon name="directions" size={16} /> Get Directions
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <button className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow-card">
            <Icon name="calendar_add_on" className="text-primary-container" />
            <span>Add to calendar</span>
          </button>
          <button className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow-card">
            <Icon name="ios_share" className="text-primary-container" />
            <span>Share QR</span>
          </button>
          <button className="flex flex-col items-center gap-1 bg-white rounded-xl p-3 shadow-card">
            <Icon name="cancel" className="text-red-600" />
            <span className="text-red-600">Cancel slot</span>
          </button>
        </div>

        <Link
          to="/patient/home"
          className="block text-center text-on-surface-variant font-label-bold text-label-bold uppercase py-3 hover:text-primary-container"
        >
          Bumalik sa Home
        </Link>
      </main>
    </PatientShell>
  );
}
