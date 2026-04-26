import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { patientNotifications } from '../../data/patientApp.js';

const colorMap = {
  primary: 'bg-primary-container/10 text-primary-container',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  red: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export default function PatientNotifications() {
  return (
    <PatientShell>
      <PatientHeader
        title="Mga abiso"
        rightAction={
          <button className="text-white text-xs font-bold uppercase">Markahan lahat</button>
        }
      />

      <main className="px-container-padding py-stack-md space-y-stack-sm screen-enter">
        {patientNotifications.map((n) => (
          <div
            key={n.id}
            className={`bg-white rounded-xl p-4 shadow-card flex gap-3 border ${
              n.type === 'critical' || n.type === 'reminder'
                ? 'border-primary-container/60 notif-alert-pulse'
                : 'border-transparent'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                colorMap[n.color]
              }`}
            >
              <Icon name={n.icon} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start gap-2">
                <p className="font-bold text-on-surface text-sm">{n.title}</p>
                <span className="text-[11px] text-on-surface-variant shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">{n.body}</p>
              {n.fromAi && (
                <span className="inline-block mt-2 text-[10px] font-bold text-primary-container">
                  <span className="font-ai-signature font-black">AI</span> Insight
                </span>
              )}
            </div>
          </div>
        ))}

        <p className="text-center text-on-surface-variant text-xs mt-4">
          Wala nang ipapakita pa.
        </p>
      </main>
    </PatientShell>
  );
}
