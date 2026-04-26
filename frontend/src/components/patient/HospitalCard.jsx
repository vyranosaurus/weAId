import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import { StatusPill } from '../shared/Pills.jsx';
import { LinkButton, MutedButton } from '../shared/Buttons.jsx';
import { queueColors } from '../../data/hospitals.js';

export default function HospitalCard({ hospital, featured = false, compact = false, enterIndex = 0 }) {
  const q = queueColors[hospital.queueLevel];
  const isNearest = hospital.distanceKm < 3;
  return (
    <article
      className={`relative bg-white rounded-xl shadow-card ${
        isNearest
          ? 'border-2 border-primary-container/40 shadow-[0_0_0_1px_rgba(122,28,28,0.08),0_10px_26px_rgba(122,28,28,0.18)]'
          : 'border border-gray-100'
      } ${
        compact ? 'p-3' : 'p-4'
      } flex flex-col ${compact ? 'gap-3' : 'gap-stack-md'} overflow-hidden hospital-card-domino ${
        hospital.slotUnavailable ? 'opacity-90' : ''
      }`}
      style={{ '--domino-delay': `${enterIndex * 70}ms` }}
    >
      {isNearest && (
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-primary-container/30 nearest-border-pulse" />
      )}

      {featured && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container" />}

      <div className={`flex justify-between items-start gap-2 ${featured ? 'pl-2' : ''}`}>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-bold text-[10px] uppercase tracking-wider ${q.bg} ${q.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${q.dot}`} />
              {hospital.queueLabel}
            </span>
            {isNearest && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container text-white text-[9px] font-medium uppercase tracking-[0.08em] shadow-sm">
                <Icon name="near_me" size={11} />
                Malapit
              </span>
            )}
          </div>
          <Link to={`/patient/hospital/${hospital.id}`}>
            <h2 className={`font-headline-sm font-extrabold text-on-surface line-clamp-1 tracking-tight hover:underline ${compact ? 'text-[16px]' : 'text-[18px]'}`}>
              {hospital.name}
            </h2>
          </Link>
          <p className={`font-body-md text-on-surface-variant ${compact ? 'text-[12px]' : 'text-body-md'}`}>{hospital.type}</p>
        </div>
        <div className="flex flex-col items-end text-right shrink-0">
          <span className={`font-headline-sm font-bold text-on-surface ${compact ? 'text-[16px]' : 'text-[18px]'}`}>
            {hospital.distanceKm} km
          </span>
          <span className={`text-on-surface-variant flex items-center gap-1 ${compact ? 'text-[11px]' : 'text-[12px]'}`}>
            <Icon name={hospital.transport === 'car' ? 'directions_car' : 'directions_bus'} size={compact ? 12 : 14} />{' '}
            {hospital.etaMin} min
          </span>
        </div>
      </div>

      <div className={`flex flex-wrap gap-2 ${featured ? 'pl-2' : ''}`}>
        {hospital.cost.map((c) =>
          c === 'LIBRE' || c === 'LIBRE KONSULTA' ? (
            <StatusPill key={c} tone="emerald" label={c} icon="check_circle" />
          ) : c === 'PHILHEALTH' ? (
            <StatusPill key={c} tone="blue" label="PHILHEALTH" icon="verified" />
          ) : (
            <StatusPill key={c} tone="gray" label={c} />
          ),
        )}
        {hospital.weatherWarning && (
          <StatusPill tone="blue" label="MAY ULAN" icon="umbrella" />
        )}
      </div>

      <div className={`grid grid-cols-3 ${compact ? 'gap-2 mt-0.5' : 'gap-stack-sm mt-1'} ${featured ? 'pl-2' : ''}`}>
        <LinkButton
          to={`/patient/hospital/${hospital.id}/services`}
          variant="outline"
          size="sm"
          icon={<Icon name="medical_information" size={15} />}
          className="!px-2 !text-[10px]"
        >
          Serbisyo
        </LinkButton>
        {hospital.slotUnavailable ? (
          <MutedButton className="w-full !px-2 !text-[10px]" size="sm" icon={<Icon name="event_busy" size={15} />} disabled>
            Mag-Book
          </MutedButton>
        ) : (
          <LinkButton
            to={`/patient/hospital/${hospital.id}`}
            variant="primary"
            size="sm"
            icon={<Icon name="event_available" size={15} />}
            className="!px-2 !text-[10px]"
          >
            Mag-Book
          </LinkButton>
        )}
        <LinkButton
          to={`/patient/hospital/${hospital.id}/directions`}
          variant="outline"
          size="sm"
          icon={<Icon name="directions" size={16} />}
          className="!px-2 !text-[10px]"
        >
          Direksyon
        </LinkButton>
      </div>
    </article>
  );
}
