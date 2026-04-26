import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { healthTips } from '../../data/patientApp.js';

const tagColor = {
  General: 'bg-primary-container/10 text-primary-container',
  Dengue: 'bg-red-100 text-red-700',
  Buntis: 'bg-primary-container/10 text-primary-container',
  Bata: 'bg-blue-100 text-blue-700',
  'Mental Health': 'bg-purple-100 text-purple-700',
  'Lola/Lolo': 'bg-amber-100 text-amber-700',
};

export default function HealthTips() {
  return (
    <PatientShell>
      <PatientHeader
        title="Basahin"
        rightAction={<Icon name="menu_book" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-stack-md space-y-stack-md">
        {/* Featured */}
        <div className="bg-primary-container rounded-2xl p-stack-lg text-white shadow-hero relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-white/80">
            Featured · Klima at Kalusugan
          </span>
          <h2 className="font-display-md text-display-md mt-1">
            Mainit na panahon? Paano umiwas sa heat-related illness.
          </h2>
          <p className="text-white/85 text-sm mt-2">
            4 min basahin · Hydration, pahinga, at heat safety para sa buong pamilya.
          </p>
          <button className="mt-3 bg-white text-primary-container font-bold px-5 py-2 rounded-full">
            Basahin
          </button>
        </div>

        {/* List */}
        <div className="space-y-stack-sm">
          {healthTips.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl p-4 shadow-card flex gap-3 items-start hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                <Icon name="article" />
              </div>
              <div className="flex-1">
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${tagColor[t.tag]}`}
                >
                  {t.tag}
                </span>
                <h3 className="font-bold mt-1">{t.title}</h3>
                <p className="text-xs text-on-surface-variant mt-1">{t.readMin} min basahin</p>
              </div>
              <Icon name="chevron_right" className="text-on-surface-variant" />
            </div>
          ))}
        </div>
      </main>
    </PatientShell>
  );
}
