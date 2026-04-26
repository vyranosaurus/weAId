import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';

export default function HospitalProfile() {
  return (
    <AdminShell breadcrumb="Hospital Profile">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Hospital Profile</h1>
          <p className="text-on-surface-variant text-sm">
            Pamahalaan ang impormasyong nakikita ng pasyente sa weAId
          </p>
        </div>
        <button className="bg-primary-container text-white px-5 py-2 rounded-full text-xs font-bold uppercase">
          <Icon name="save" size={16} className="inline mr-1" /> I-save
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Basic */}
          <Section title="Basic info">
            <Field label="Pangalan ng ospital" value="Philippine General Hospital" />
            <Field label="Maikling pangalan" value="PGH" />
            <Field label="Uri" value="DOH-retained Tertiary" type="select" />
            <Field label="Address" value="Taft Avenue, Ermita, Manila" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" value="(02) 8554-8400" />
              <Field label="Email" value="info@pgh.gov.ph" />
            </div>
            <Field label="Website" value="https://pgh.gov.ph" />
          </Section>

          {/* Hours */}
          <Section title="Buksan / Sarado oras">
            <div className="space-y-2">
              {['Lunes', 'Martes', 'Miyerkules', 'Huwebes', 'Biyernes', 'Sabado', 'Linggo'].map(
                (d) => (
                  <div key={d} className="flex justify-between items-center text-sm">
                    <span className="font-bold w-24">{d}</span>
                    <span className="text-on-surface-variant">8:00 AM - 5:00 PM</span>
                    <button className="text-primary-container text-xs font-bold uppercase">
                      Edit
                    </button>
                  </div>
                ),
              )}
              <p className="text-xs text-on-surface-variant pt-2">
                ER: 24 oras · Outpatient: 8AM-5PM
              </p>
            </div>
          </Section>

          {/* Services */}
          <Section title="Mga serbisyo">
            <p className="text-xs text-on-surface-variant mb-2">
              I-tap para i-toggle. Naka-bold ang aktibo.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Emergency',
                'OB-GYN',
                'Pediatrics',
                'Internal Medicine',
                'Surgery',
                'Cardiology',
                'Dialysis',
                'Lab',
                'Pharmacy',
                'Imaging',
                'Mental Health',
                'Dental',
              ].map((s, i) => (
                <button
                  key={s}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
                    i < 9
                      ? 'bg-primary-container text-white'
                      : 'bg-white border border-outline-variant text-on-surface'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Section>

          {/* Cost */}
          <Section title="Bayad / PhilHealth / HMO">
            <div className="space-y-2 text-sm">
              <Toggle label="Tinatanggap ang PhilHealth" on />
              <Toggle label="Libre ang konsulta sa OPD" on />
              <Toggle label="Tinatanggap ang HMO" on />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold mb-2">
                Mga HMO partner
              </p>
              <div className="flex flex-wrap gap-2">
                {['Maxicare', 'Medicard', 'Intellicare', 'PhilCare'].map((h) => (
                  <span
                    key={h}
                    className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {h} <Icon name="close" size={14} />
                  </span>
                ))}
                <button className="text-xs font-bold text-primary-container">+ Magdagdag</button>
              </div>
            </div>
          </Section>
        </div>

        <aside className="space-y-4">
          {/* Photos */}
          <Section title="Mga larawan">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gradient-to-br from-primary-container/20 to-surface-container flex items-center justify-center text-on-surface-variant"
                >
                  <Icon name="image" size={32} />
                </div>
              ))}
            </div>
            <button className="w-full mt-3 bg-white border-2 border-dashed border-outline-variant text-on-surface-variant rounded-lg py-3 text-xs font-bold uppercase hover:border-primary-container hover:text-primary-container">
              + I-upload
            </button>
          </Section>

          {/* Pasilidad */}
          <Section title="Pasilidad">
            {['PWD ramp', 'Wheelchair', 'Pharmacy', 'ATM', 'Cafeteria', 'Breastfeeding room'].map(
              (f) => (
                <Toggle key={f} label={f} on />
              ),
            )}
          </Section>

          {/* Visibility */}
          <Section title="Visibility sa weAId">
            <Toggle label="Ipakita sa search results" on />
            <Toggle label="Tanggapin ang weAId bookings" on />
            <Toggle label="Allow direct messaging" on />
            <Toggle label="Ipakita ang real-time queue" on />
          </Section>
        </aside>
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

function Field({ label, value }) {
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
