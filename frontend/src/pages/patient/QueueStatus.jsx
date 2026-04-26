import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { reservations } from '../../data/patientApp.js';

export default function QueueStatus() {
  const current = reservations.find((r) => r.status === 'today') || reservations[0];
  const queueNumber = current?.queueNow ?? 0;
  const eta = current?.waitOnArrival ?? 0;

  return (
    <PatientShell>
      <PatientHeader
        title="Current Queue"
        subtitle={current.hospitalName}
        showBack={false}
        rightAction={<Icon name="queue" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-stack-md space-y-4 screen-enter">
        <section className="bg-gradient-to-br from-primary-container via-[#7f1f1f] to-[#5f1414] text-white rounded-2xl p-5 shadow-hero border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-black/20 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-white/80">
                  Current hospital
                </p>
                <h2 className="font-headline-sm text-headline-sm font-extrabold mt-1">{current.hospitalName}</h2>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[9px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Active Queue
              </span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-[72px] leading-none font-black">{queueNumber}</span>
              <span className="text-[16px] pb-2 text-white/90 font-bold">sa pila</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1.5">
              <Icon name="schedule" size={14} />
              <span className="text-[11px] font-bold">Tinatayang hintay: ~{eta} min</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-4 shadow-card border border-outline-variant/25">
          <h3 className="font-bold text-on-surface mb-3 flex items-center gap-2">
            <Icon name="info" className="text-primary-container" size={18} />
            Tips habang naghihintay
          </h3>
          <ul className="space-y-2.5 text-[12px] text-on-surface-variant">
            <li className="flex items-start gap-2">
              <Icon name="check_circle" size={14} className="text-emerald-500 mt-0.5" />
              Panatilihing bukas ang notifications para sa queue updates.
            </li>
            <li className="flex items-start gap-2">
              <Icon name="check_circle" size={14} className="text-emerald-500 mt-0.5" />
              Ihanda ang valid ID at health card bago tawagin ang number.
            </li>
            <li className="flex items-start gap-2">
              <Icon name="check_circle" size={14} className="text-emerald-500 mt-0.5" />
              Lumapit agad sa triage desk kapag number mo na.
            </li>
          </ul>
        </section>

        <Link
          to={`/patient/reservation/${current.id}`}
          className="block w-full text-center bg-primary-container text-white py-3.5 rounded-full font-label-bold text-label-bold uppercase shadow-card hover:bg-[#600000] transition-all"
        >
          Tingnan reservation details
        </Link>
      </main>
    </PatientShell>
  );
}
