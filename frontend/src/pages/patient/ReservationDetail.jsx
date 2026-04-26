import { useParams, Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { reservations } from '../../data/patientApp.js';

export default function ReservationDetail() {
  const { id } = useParams();
  const r = reservations.find((x) => x.id === id) || reservations[0];

  return (
    <PatientShell hideNav>
      <PatientHeader title="Detalye" subtitle={r.id} />

      <main className="px-container-padding py-stack-lg space-y-stack-lg">
        {/* Live status pill (for today) */}
        {r.status === 'today' && (
          <div className="bg-primary-container/5 border border-primary-container/30 rounded-xl p-3 flex items-start gap-3">
            <Icon name="schedule" className="text-primary-container mt-1" />
            <div>
              <p className="font-bold text-on-surface">{r.timeToSlot} bago ang slot</p>
              <p className="text-xs text-on-surface-variant">
                Live: {r.queueNow} sa pila ngayon · ~{r.waitOnArrival} min hintayan
              </p>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl p-stack-lg shadow-card">
          <h2 className="font-display-md text-display-md">{r.service}</h2>
          <p className="text-on-surface-variant flex items-center gap-1 mt-1">
            <Icon name="local_hospital" size={16} /> {r.hospitalName}
          </p>

          <div className="grid grid-cols-2 gap-stack-md mt-stack-lg">
            <Field label="Petsa" value={r.date} />
            <Field label="Oras" value={r.timeSlot} maroon />
            <Field label="Cost" value={r.cost} />
            <Field label="Status" value={r.status.toUpperCase()} />
          </div>

          {r.status === 'today' && (
            <>
              <div className="mt-stack-lg flex flex-col items-center bg-[#F5F5F5] rounded-xl p-4">
                <div className="w-40 h-40 bg-white border-2 border-primary-container/30 rounded-lg flex items-center justify-center">
                  <Icon name="qr_code_2" size={122} className="text-primary-container" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-xl shadow-card p-4">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <Icon name="map" className="text-primary-container" /> Direksyon
          </h3>
          <div className="h-32 rounded-lg bg-gradient-to-br from-[#efe7e7] to-[#ddd7d7] relative overflow-hidden border border-outline-variant/30">
            <div className="absolute inset-0 opacity-55">
              <div className="absolute top-3 left-0 right-0 h-[2px] bg-white/70" />
              <div className="absolute top-10 left-0 right-0 h-[2px] bg-white/60" />
              <div className="absolute top-20 left-0 right-0 h-[2px] bg-white/55" />
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-white/55" />
              <div className="absolute left-28 top-0 bottom-0 w-[2px] bg-white/60" />
              <div className="absolute left-52 top-0 bottom-0 w-[2px] bg-white/50" />
            </div>
            <div className="absolute left-6 top-7 w-[72%] h-[3px] bg-primary-container/75 rounded-full rotate-[18deg]" />
            <div className="absolute left-[70%] top-[56%] w-3 h-3 rounded-full bg-primary-container border-2 border-white shadow-md" />
            <div className="absolute left-[18%] top-[34%] w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
            <div className="absolute left-[74%] top-[48%] text-[10px] font-bold text-primary-container bg-white/85 px-1.5 py-0.5 rounded">
              Ospital
            </div>
            <div className="absolute left-[8%] top-[26%] text-[10px] font-bold text-emerald-700 bg-white/85 px-1.5 py-0.5 rounded">
              Kayo
            </div>
            <span className="absolute top-2 left-2 text-xs bg-white px-2 py-1 rounded-full font-bold">
              {r.travelEta || 12} min · {r.distanceKm || 1.4} km
            </span>
          </div>
          <button className="w-full mt-3 bg-primary-container text-white py-3 rounded-full font-label-bold text-label-bold uppercase">
            Buksan sa Maps
          </button>
        </div>

        {/* Actions */}
        {r.status !== 'past' && r.status !== 'cancelled' && (
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-white border-2 border-primary-container text-primary-container py-3 rounded-full font-label-bold text-label-bold uppercase">
              I-reschedule
            </button>
            <button className="bg-white border-2 border-[#1D1D1F] text-red-600 py-3 rounded-full font-label-bold text-label-bold uppercase">
              I-cancel
            </button>
          </div>
        )}

        <Link
          to={`/patient/messages/${r.id}`}
          className="block w-full bg-primary-container text-white text-center py-3 rounded-full font-label-bold text-label-bold uppercase"
        >
          <Icon name="chat" size={16} className="inline mr-2" />
          I-message ang ospital
        </Link>
      </main>
    </PatientShell>
  );
}

function Field({ label, value, maroon }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">{label}</p>
      <p className={`font-bold ${maroon ? 'text-primary-container' : 'text-on-surface'}`}>
        {value}
      </p>
    </div>
  );
}
