import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { currentPatient } from '../../data/patients.js';

const hotlines = [
  { name: '911 — National Emergency', number: '911', color: 'bg-red-600' },
  { name: 'PGH — ER Hotline', number: '(02) 8554-8400', color: 'bg-primary-container' },
  { name: 'Ospital ng Maynila — ER', number: '(02) 8523-8131', color: 'bg-primary-container' },
  { name: 'Red Cross', number: '143', color: 'bg-[#9A1919]' },
  { name: 'DOH Hotline', number: '1555', color: 'bg-[#600000]' },
];

export default function Emergency() {
  return (
    <PatientShell hideNav>
      <PatientHeader
        title="EMERGENCY"
        subtitle="Pinakamalapit na ER, agad."
        toneOverride="red"
      />

      <main className="px-container-padding py-stack-lg space-y-stack-lg">
        {/* Big SOS button */}
        <button className="w-full emergency-maroon-pulse text-white py-8 rounded-2xl shadow-lg border border-white/15 flex flex-col items-center gap-2 active:scale-95">
          <Icon name="emergency" size={48} filled />
          <span className="font-display-md text-display-md">TUMAWAG SA 911</span>
          <span className="text-white/80 text-xs">May pinakamalapit na ER kami para sa inyo</span>
        </button>

        {/* Closest ER */}
        <div className="bg-white rounded-xl p-4 shadow-card border-l-4 border-red-600">
          <p className="text-[10px] uppercase tracking-wider font-bold text-red-600">
            Pinakamalapit ngayon
          </p>
          <h3 className="font-display-md text-display-md text-on-surface mt-1">
            Ospital ng Maynila ER
          </h3>
          <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
            <Icon name="location_on" size={16} /> 1.2 km · ~5 min biyahe
          </p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-primary-container text-white py-3 rounded-full font-label-bold text-label-bold uppercase">
              Kunin ang direksyon
            </button>
            <button className="bg-white border-2 border-primary-container text-primary-container px-4 py-3 rounded-full">
              <Icon name="phone" />
            </button>
          </div>
        </div>

        {/* Hotlines */}
        <section>
          <h3 className="font-bold mb-stack-sm">Mga hotline</h3>
          <div className="space-y-stack-sm">
            {hotlines.map((h) => (
              <a
                key={h.name}
                href={`tel:${h.number}`}
                className={`flex items-center gap-3 ${h.color} text-white rounded-xl p-3 shadow-card`}
              >
                <Icon name="call" />
                <div className="flex-1">
                  <p className="font-bold">{h.name}</p>
                  <p className="text-xs text-white/80">{h.number}</p>
                </div>
                <Icon name="chevron_right" />
              </a>
            ))}
          </div>
        </section>

        {/* Personal contact */}
        <div className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Icon name="contact_emergency" className="text-red-600" /> Inyong emergency contact
          </h3>
          <p className="text-on-surface-variant text-sm">{currentPatient.emergencyContact}</p>
        </div>

        <div className="bg-white border border-primary-container/25 rounded-xl p-3 text-xs text-on-surface flex gap-2 shadow-card">
          <Icon name="warning" size={16} className="text-primary-container" />
          <span>
            Kung delikado ang sitwasyon, agad na tumawag sa 911. Hindi po replacement ang weAId sa
            emergency response.
          </span>
        </div>
      </main>
    </PatientShell>
  );
}
