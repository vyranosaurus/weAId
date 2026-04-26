import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { patientMessages } from '../../data/patientApp.js';

export default function PatientMessages() {
  return (
    <PatientShell>
      <PatientHeader title="Mensahe" showBack={false} rightAction={
        <button className="p-2 rounded-full hover:bg-white/10">
          <Icon name="search" />
        </button>
      } />

      <main className="px-container-padding py-stack-md space-y-stack-sm">
        {patientMessages.map((m) => (
          <Link
            key={m.id}
            to={`/patient/messages/${m.id}`}
            className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card hover:shadow-md transition-all"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                m.pinned ? 'bg-primary-container/15' : 'bg-surface-container'
              }`}
            >
              <Icon name={m.pinned ? 'campaign' : 'local_hospital'} className="text-primary-container" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-on-surface truncate">{m.name}</h3>
                <span className="text-[11px] text-on-surface-variant shrink-0 ml-2">{m.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant truncate">
                <span className="font-bold">{m.subtitle}</span> · {m.preview}
              </p>
            </div>
            {m.unread > 0 && (
              <span className="w-6 h-6 rounded-full bg-primary-container text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                {m.unread}
              </span>
            )}
            {m.pinned && <Icon name="push_pin" className="text-primary-container shrink-0" size={16} />}
          </Link>
        ))}

        <p className="text-center text-on-surface-variant text-xs mt-4">
          Ang mga mensahe ay live mula sa ospital at AI assistant.
        </p>
      </main>
    </PatientShell>
  );
}
