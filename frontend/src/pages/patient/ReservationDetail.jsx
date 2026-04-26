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
      <PatientHeader title="Detalye ng booking" subtitle={r.id} />

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
                <div className="w-32 h-32 bg-white border-2 border-primary-container/30 rounded-lg flex items-center justify-center">
                  <Icon name="qr_code_2" size={96} className="text-primary-container" />
                </div>
                <p className="text-[10px] uppercase tracking-wider text-on-surface-variant mt-2">
                  Ipakita sa pagdating
                </p>
              </div>
            </>
          )}
        </div>

        {/* Map placeholder */}
        <div className="bg-white rounded-xl shadow-card p-4">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <Icon name="map" className="text-primary-container" /> Direksyon
          </h3>
          <div className="h-32 rounded-lg bg-gradient-to-br from-tertiary-fixed to-surface-container relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant text-sm">
              Map preview
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
            <button className="bg-white border-2 border-red-600 text-red-600 py-3 rounded-full font-label-bold text-label-bold uppercase">
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
