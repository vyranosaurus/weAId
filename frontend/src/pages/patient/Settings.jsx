import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';

const sections = [
  {
    title: 'Wika',
    items: [
      { label: 'Tagalog', sub: 'Default na ginagamit', toggle: false, value: 'TAGALOG' },
      { label: 'English', sub: 'Switch sa English', toggle: false, value: 'ENGLISH' },
    ],
    type: 'radio',
  },
  {
    title: 'Notifications',
    items: [
      { label: 'Slot reminders', sub: '1 oras bago ang slot', toggle: true, on: true },
      { label: 'Hospital announcements', sub: 'Updates mula sa ospital', toggle: true, on: true },
      { label: 'Health tips', sub: 'Lingguhang tips', toggle: true, on: false },
      { label: 'Weather warnings', sub: 'Kapag may unos sa biyahe', toggle: true, on: true },
    ],
  },
  {
    title: 'Privacy',
    items: [
      {
        label: 'Share medical info sa ospital',
        sub: 'Kapag may booking, ibinabahagi ang basic info',
        toggle: true,
        on: true,
      },
      { label: 'Allow AI to learn from chat', sub: 'Walang personal info iniimbak', toggle: true, on: true },
    ],
  },
  {
    title: 'Tulong',
    items: [
      { label: 'FAQ', sub: 'Mga karaniwang tanong', icon: 'help' },
      { label: 'Kontakin ang weAId', sub: 'Email at chat support', icon: 'support_agent' },
      { label: 'Tungkol sa weAId', sub: 'Privacy, terms, version', icon: 'info' },
    ],
  },
];

export default function PatientSettings() {
  return (
    <PatientShell>
      <PatientHeader title="Settings" />

      <main className="px-container-padding py-stack-md space-y-stack-lg">
        {sections.map((s) => (
          <section key={s.title}>
            <h3 className="text-[11px] uppercase tracking-wider font-bold text-on-surface-variant mb-2 px-1">
              {s.title}
            </h3>
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              {s.items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 border-b border-outline-variant/20 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {it.icon && (
                      <Icon name={it.icon} className="text-primary-container shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface text-sm">{it.label}</p>
                      <p className="text-xs text-on-surface-variant truncate">{it.sub}</p>
                    </div>
                  </div>
                  {it.toggle && (
                    <button
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                        it.on ? 'bg-primary-container' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                          it.on ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  )}
                  {!it.toggle && !it.icon && (
                    <span className="text-xs font-bold text-primary-container uppercase">
                      {it.value === 'TAGALOG' ? '✓ NAPILI' : 'PUMILI'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </PatientShell>
  );
}
