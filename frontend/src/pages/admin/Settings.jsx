import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';

export default function AdminSettings() {
  return (
    <AdminShell breadcrumb="Settings">
      <div>
        <h1 className="font-display-md text-display-md">Settings</h1>
        <p className="text-on-surface-variant text-sm">
          Account, preferences, integrations, security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar nav */}
        <aside className="lg:col-span-1 bg-white rounded-xl shadow-card border border-outline-variant/20 p-2 h-fit">
          {[
            { icon: 'person', label: 'Account', active: true },
            { icon: 'palette', label: 'Appearance' },
            { icon: 'translate', label: 'Wika' },
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'integration_instructions', label: 'Integrations' },
            { icon: 'security', label: 'Security & 2FA' },
            { icon: 'history', label: 'Audit log' },
            { icon: 'receipt_long', label: 'Billing' },
          ].map((it) => (
            <button
              key={it.label}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg ${
                it.active
                  ? 'bg-primary-container/10 text-primary-container'
                  : 'text-on-surface hover:bg-surface-variant/40'
              }`}
            >
              <Icon name={it.icon} />
              <span className="font-bold text-sm">{it.label}</span>
            </button>
          ))}
        </aside>

        {/* Settings panels */}
        <div className="lg:col-span-2 space-y-4">
          <Section title="Account">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center text-2xl font-bold">
                R
              </div>
              <div className="flex-1">
                <p className="font-bold">Dr. Anna Reyes</p>
                <p className="text-xs text-on-surface-variant">Admin · PGH · a.reyes@pgh.gov.ph</p>
              </div>
              <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                Palitan ang larawan
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input label="Pangalan" value="Dr. Anna Reyes" />
              <Input label="Title" value="Chief of Staff" />
              <Input label="Email" value="a.reyes@pgh.gov.ph" />
              <Input label="Phone" value="0917 555 0100" />
            </div>
          </Section>

          <Section title="Preferences">
            <Toggle label="Dark mode" />
            <Toggle label="Show AI suggestions banner" on />
            <Toggle label="Auto-refresh live queue (every 2s)" on />
            <Toggle label="Sound on critical alert" on />
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold">Default landing page</span>
              <select className="bg-white border border-outline-variant px-3 py-1.5 rounded-full text-xs font-bold">
                <option>Overview</option>
                <option>Live Queue</option>
                <option>Incoming</option>
              </select>
            </div>
          </Section>

          <Section title="Lenggwahe">
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
                ✓ Tagalog
              </button>
              <button className="bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-full text-xs font-bold uppercase">
                English
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Pwede ring magpalit ang bawat user nang sariling preference.
            </p>
          </Section>

          <Section title="Security & 2FA">
            <Toggle label="Two-factor authentication (SMS)" on />
            <Toggle label="Session lock after 15 min idle" on />
            <Toggle label="IP allow-list (hospital network only)" />
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex gap-2">
              <Icon name="info" size={16} />
              <span>
                Last password change: 2 buwan na nakalipas. Inirerekomendang baguhin tuwing 90 araw.
              </span>
            </div>
            <button className="bg-white border-2 border-primary-container text-primary-container px-4 py-2 rounded-full text-xs font-bold uppercase">
              Palitan ang password
            </button>
          </Section>

          <Section title="Integrations">
            {[
              { name: 'PhilHealth eClaims', status: 'connected' },
              { name: 'DOH Reporting', status: 'connected' },
              { name: 'HMO API (Maxicare)', status: 'connected' },
              { name: 'EMR (HOSPi)', status: 'pending' },
            ].map((i) => (
              <div
                key={i.name}
                className="flex items-center justify-between text-sm border-b border-outline-variant/20 pb-2 last:border-0"
              >
                <span className="font-bold">{i.name}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                    i.status === 'connected'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {i.status}
                </span>
              </div>
            ))}
          </Section>

          <button className="w-full bg-white border border-red-300 text-red-600 py-3 rounded-xl font-bold text-sm uppercase">
            Mag-logout sa lahat ng device
          </button>
        </div>
      </div>
    </AdminShell>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-outline-variant/20">
      <h3 className="font-headline-sm text-headline-sm mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({ label, value }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
        {label}
      </span>
      <input
        defaultValue={value}
        className="w-full mt-1 bg-[#F5F5F5] border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-container"
      />
    </label>
  );
}

function Toggle({ label, on = false }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="font-bold text-on-surface">{label}</span>
      <button
        className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
          on ? 'bg-primary-container' : 'bg-gray-300'
        }`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
            on ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );
}
