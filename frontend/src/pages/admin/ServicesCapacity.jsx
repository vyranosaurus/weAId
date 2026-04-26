import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { services, serviceStatusStyles } from '../../data/admin.js';

export default function ServicesCapacity() {
  const groups = services.reduce((acc, s) => {
    acc[s.department] = acc[s.department] || [];
    acc[s.department].push(s);
    return acc;
  }, {});

  return (
    <AdminShell breadcrumb="Services & Capacity">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Services & Capacity</h1>
          <p className="text-on-surface-variant text-sm">
            Pamahalaan ang availability ng bawat serbisyo
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="schedule" size={16} className="inline mr-1" /> Set hours
          </button>
          <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="add" size={16} className="inline mr-1" /> Add service
          </button>
        </div>
      </div>

      {/* Capacity heatmap header */}
      <div className="bg-white rounded-xl p-5 shadow-card border border-outline-variant/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline-sm text-headline-sm">Today's capacity heatmap</h2>
          <span className="text-xs text-on-surface-variant">8AM - 5PM · live</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[640px] grid" style={{ gridTemplateColumns: 'minmax(160px,1fr) repeat(9, minmax(50px,1fr))' }}>
            <div />
            {['8a', '9a', '10a', '11a', '12n', '1p', '2p', '3p', '4p'].map((t) => (
              <div key={t} className="text-[10px] uppercase tracking-wider text-on-surface-variant text-center font-bold pb-2">
                {t}
              </div>
            ))}
            {services.slice(0, 5).map((s) => (
              <Row key={s.id} name={s.name} status={s.status} />
            ))}
          </div>
        </div>
      </div>

      {/* Service grid */}
      {Object.entries(groups).map(([dept, items]) => (
        <section key={dept} className="space-y-3">
          <h3 className="font-bold text-on-surface flex items-center gap-2">
            <Icon name="folder" className="text-primary-container" size={18} /> {dept}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {items.map((s) => {
              const st = serviceStatusStyles[s.status];
              const pct = s.capacity.max ? Math.round((s.capacity.now / s.capacity.max) * 100) : 0;
              return (
                <div
                  key={s.id}
                  className={`bg-white rounded-xl p-4 shadow-card border ${
                    s.status === 'down' ? 'border-red-300' : 'border-outline-variant/20'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-on-surface">{s.name}</h4>
                      <p className="text-xs text-on-surface-variant">{s.department}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${st.bg} ${st.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </span>
                  </div>

                  {s.reason && (
                    <p className="text-xs text-red-600 mt-2 flex items-start gap-1">
                      <Icon name="warning" size={14} /> {s.reason}
                    </p>
                  )}

                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <Stat label="Today served" value={s.todayServed} />
                    <Stat label="Waiting" value={s.waiting} />
                    <Stat label="Avg wait" value={`${s.avgWait}m`} />
                  </div>

                  {/* Capacity bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-on-surface-variant mb-1">
                      <span>Capacity</span>
                      <span>
                        {s.capacity.now}/{s.capacity.max}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-variant/60 overflow-hidden">
                      <div
                        className={`h-full ${
                          pct > 85 ? 'bg-red-500' : pct > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-white border border-outline-variant text-on-surface py-2 rounded-full text-[11px] font-bold uppercase">
                      Edit
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase ${
                        s.status === 'open'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {s.status === 'open' ? 'I-pause' : 'Buksan ulit'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </AdminShell>
  );
}

function Row({ name, status }) {
  const colorByHour = (i) => {
    if (status === 'down') return 'bg-red-500/30';
    if (status === 'limited' && i >= 3 && i <= 6) return 'bg-amber-500/40';
    if (i === 1 || i === 6) return 'bg-amber-500/60';
    if (i >= 3 && i <= 5) return 'bg-red-500/40';
    return 'bg-emerald-500/40';
  };
  return (
    <>
      <div className="text-xs text-on-surface font-bold py-2 pr-2 border-t border-outline-variant/20">
        {name}
      </div>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="border-t border-outline-variant/20 p-1">
          <div className={`h-6 rounded ${colorByHour(i)}`} />
        </div>
      ))}
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-surface-variant/30 rounded-lg p-2">
      <p className="text-[10px] uppercase text-on-surface-variant">{label}</p>
      <p className="font-bold text-on-surface">{value}</p>
    </div>
  );
}
