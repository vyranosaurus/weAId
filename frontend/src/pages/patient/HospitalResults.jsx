import { useState } from 'react';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import HospitalCard from '../../components/patient/HospitalCard.jsx';
import { FilterChip } from '../../components/shared/Pills.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { hospitals } from '../../data/hospitals.js';

const filters = ['Lahat', 'Distance', 'Libre', 'PhilHealth', 'LGU Only', 'Buksan ngayon'];

export default function HospitalResults() {
  const [active, setActive] = useState('Lahat');

  return (
    <PatientShell>
      <PatientHeader
        title="Mga Ospital"
      />

      <main className="px-container-padding pt-stack-md space-y-stack-md pb-4">
        {/* AI Banner */}
        <div className="bg-primary-container/5 border border-primary-container/20 rounded-xl p-3 flex items-start gap-3">
          <span className="font-ai-signature text-primary-container text-2xl ai-glow-dark mt-0.5 font-black">
            AI
          </span>
          <div>
            <p className="text-sm font-bold text-on-surface">
              Para sa posibleng heatstroke assessment (Urgent), ito ang pinakamabuti.
            </p>
            <p className="text-xs text-on-surface-variant">
              Naka-sort ayon sa pinakamabilis na pila + pinakamalapit.
            </p>
          </div>
        </div>

        {/* Filters */}
        <section className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-container-padding px-container-padding">
          {filters.map((f) => (
            <FilterChip
              key={f}
              label={f}
              active={f === active}
              icon={f === 'Lahat' ? 'tune' : null}
              iconRight={f === 'Distance' ? 'expand_more' : null}
              onClick={() => setActive(f)}
            />
          ))}
        </section>

        <div className="flex justify-between items-end">
          <p className="text-body-md text-on-surface-variant">
            May nahanap na <span className="font-bold text-on-surface">{hospitals.length}</span> na ospital
          </p>
          <button className="font-label-bold text-label-bold text-primary-container flex items-center gap-1">
            Pinakamalapit
            <Icon name="sort" size={16} />
          </button>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-stack-md">
          {hospitals.map((h) => (
            <HospitalCard key={h.id} hospital={h} featured={h.featured} />
          ))}
        </div>

        <p className="text-center text-on-surface-variant text-xs pt-4">
          Wala nang ipapakita pa. Subukang baguhin ang filter.
        </p>
      </main>
    </PatientShell>
  );
}
