import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { currentPatient } from '../../data/patients.js';

export default function Family() {
  return (
    <PatientShell hideNav>
      <PatientHeader title="Pamilya" subtitle="Mga taong inyong inaalagaan" />

      <main className="px-container-padding py-stack-lg space-y-stack-md">
        <button className="w-full bg-primary-container text-white py-4 rounded-full font-label-bold text-label-bold uppercase shadow-card flex items-center justify-center gap-2">
          <Icon name="person_add" /> Magdagdag ng pamilya
        </button>

        <div className="space-y-stack-sm">
          {currentPatient.dependents.map((d) => (
            <div key={d.id} className="bg-white rounded-xl p-4 shadow-card flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container font-bold">
                {d.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{d.name}</h3>
                <p className="text-xs text-on-surface-variant">
                  {d.relation} · {d.age} taong gulang · {d.sex}
                </p>
              </div>
              <button className="bg-primary-container/10 text-primary-container px-3 py-2 rounded-full text-xs font-bold uppercase">
                Mag-book
              </button>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
          <p className="font-bold flex items-center gap-1">
            <Icon name="info" size={16} /> Importante
          </p>
          Ang lahat ng booking ay nakatag sa "Para kay [pangalan]" para alam ng ospital kung sino
          ang patient.
        </div>
      </main>
    </PatientShell>
  );
}
