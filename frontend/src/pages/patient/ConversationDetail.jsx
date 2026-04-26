import { useParams } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { patientMessages, conversationSample, suggestedReplies } from '../../data/patientApp.js';

export default function ConversationDetail() {
  const { id } = useParams();
  const m = patientMessages.find((x) => x.id === id) || patientMessages[0];

  return (
    <PatientShell hideNav>
      <PatientHeader
        title={m.name}
        subtitle={m.subtitle}
        rightAction={
          <button className="p-2 rounded-full hover:bg-white/10">
            <Icon name="phone" />
          </button>
        }
      />

      {/* Disclaimer */}
      <div className="px-container-padding pt-stack-md">
        <div className="bg-surface-variant text-on-surface-variant text-xs px-4 py-2 rounded-full text-center">
          Lahat ng mensahe ay ina-archive ng ospital.
        </div>
      </div>

      <main className="px-container-padding py-stack-md flex flex-col gap-stack-md pb-44">
        {conversationSample.map((c, i) => (
          <div key={i} className={`flex ${c.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%]">
              <div
                className={`text-body-md px-4 py-3 rounded-2xl shadow-card ${
                  c.from === 'patient'
                    ? 'bg-primary-container text-white rounded-tr-sm'
                    : 'bg-white text-on-surface rounded-tl-sm'
                }`}
              >
                {c.text}
              </div>
              <p
                className={`text-[10px] text-on-surface-variant mt-1 ${
                  c.from === 'patient' ? 'text-right' : 'text-left'
                }`}
              >
                {c.time}
              </p>
            </div>
          </div>
        ))}
      </main>

      {/* Suggested replies + input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-outline-variant/40 px-container-padding py-3 pb-safe shadow-nav-top z-40">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
          {suggestedReplies.map((r) => (
            <button
              key={r}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-primary-container/10 text-primary-container text-xs font-bold border border-primary-container/30"
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full">
            <Icon name="add_circle" />
          </button>
          <input
            className="flex-1 bg-[#F5F5F5] border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:outline-none focus:border-primary-container"
            placeholder="Magsulat ng mensahe…"
          />
          <button className="w-12 h-12 bg-primary-container text-white rounded-full flex items-center justify-center shadow-card active:scale-95">
            <Icon name="send" />
          </button>
        </div>
      </div>
    </PatientShell>
  );
}
