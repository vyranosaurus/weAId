import { Link } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell.jsx';
import KpiCard from '../../components/admin/KpiCard.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { dashboardKpis, aiInsights } from '../../data/admin.js';
import { queuePatients, priorityStyles, incomingPatients } from '../../data/patients.js';

const sparkline = [12, 18, 22, 14, 28, 32, 30, 26, 38, 45, 42, 47];

export default function AdminOverview() {
  return (
    <AdminShell breadcrumb="Overview">
      {/* Header band */}
      <div className="bg-primary-container text-white rounded-b-[20px] -mx-container-padding -mt-container-padding mb-2 px-container-padding pt-stack-lg pb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-md text-display-md">Magandang umaga, Dr. Reyes.</h1>
          <p className="text-white/85 text-sm">Heto ang state ng PGH ngayong umaga.</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
            Hunyo 14, 2026 · 08:42 AM · synced 2s ago
          </span>
          <button className="px-5 py-2 rounded-full border-[1.5px] border-white/60 text-white text-xs font-bold uppercase flex items-center gap-2 hover:bg-white/10">
            <Icon name="download" size={18} /> Daily report
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardKpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            deltaTone={k.color === 'primary' ? 'gray' : k.color}
          >
            {k.color === 'primary' && (
              <div className="w-16 h-8 flex items-end gap-0.5">
                {sparkline.map((v, i) => (
                  <div
                    key={i}
                    style={{ height: `${(v / 50) * 100}%` }}
                    className="flex-1 bg-primary-container/30 rounded-t-sm"
                  />
                ))}
              </div>
            )}
          </KpiCard>
        ))}
      </div>

      {/* Chart + AI insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-card border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-headline-sm">Patient flow — last 24h</h2>
            <div className="flex bg-surface-variant/50 rounded-full p-1">
              {['24h', '7d', '30d'].map((t, i) => (
                <button
                  key={t}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${
                    i === 0
                      ? 'bg-white text-primary-container shadow-sm'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 w-full bg-gradient-to-t from-primary-container/10 to-transparent rounded-lg border-b-2 border-primary-container relative flex items-end pb-2 px-2">
            {sparkline.map((v, i) => (
              <div
                key={i}
                style={{ height: `${(v / 50) * 100}%` }}
                className="flex-1 mx-0.5 bg-primary-container/40 hover:bg-primary-container rounded-t-md transition-colors relative group"
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 bg-on-surface text-white px-2 py-0.5 rounded">
                  {v}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-on-surface-variant mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>NOW</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-card border border-primary-container/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <h2 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
            <span className="font-ai-signature font-black text-primary-container ai-glow-dark text-2xl">
              AI
            </span>
            Insights
          </h2>
          <div className="space-y-3">
            {aiInsights.slice(0, 3).map((ins) => (
              <div key={ins.id} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-primary-container mt-2 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-on-surface-variant">{ins.text}</p>
                  <a className="text-xs font-bold text-primary-container hover:underline mt-1 block">
                    Apply suggestion: {ins.impact}
                  </a>
                </div>
              </div>
            ))}
            <Link
              to="/admin/staffing"
              className="text-xs font-bold text-primary-container uppercase hover:underline block"
            >
              Tingnan lahat →
            </Link>
          </div>
        </div>
      </div>

      {/* Live queue + Incoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden">
          <div className="px-5 py-4 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm">Live queue snapshot</h3>
            <Link
              to="/admin/queue"
              className="text-primary-container text-xs font-bold uppercase hover:underline"
            >
              Tingnan lahat
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="text-left px-5 py-2">#</th>
                <th className="text-left py-2">Patient</th>
                <th className="text-left py-2">Service</th>
                <th className="text-left py-2">Wait</th>
                <th className="text-right px-5 py-2">Pri</th>
              </tr>
            </thead>
            <tbody>
              {queuePatients.slice(0, 5).map((p) => {
                const s = priorityStyles[p.priority];
                return (
                  <tr
                    key={p.id}
                    className="border-b border-outline-variant/20 last:border-0 hover:bg-surface-variant/30"
                  >
                    <td className="px-5 py-3 font-mono text-xs">#{p.id}</td>
                    <td className="py-3">
                      <Link
                        to={`/admin/patient/${p.id}`}
                        className="font-bold text-on-surface hover:text-primary-container"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-on-surface-variant truncate max-w-[200px]">
                        {p.complaint}
                      </p>
                    </td>
                    <td className="py-3 text-xs">{p.service}</td>
                    <td className="py-3 text-xs">{p.waitMin}m</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden">
          <div className="px-5 py-4 border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm">Incoming via weAId</h3>
            <Link
              to="/admin/incoming"
              className="text-primary-container text-xs font-bold uppercase hover:underline"
            >
              Tingnan lahat
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/20">
            {incomingPatients.slice(0, 5).map((p) => {
              const s = priorityStyles[p.priority];
              return (
                <div key={p.id} className="px-5 py-3 hover:bg-surface-variant/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        to={`/admin/patient/${p.id}`}
                        className="font-bold text-on-surface hover:text-primary-container"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-on-surface-variant">{p.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary-container">ETA {p.etaMin}m</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service status */}
      <div className="bg-white rounded-xl p-6 shadow-card border border-outline-variant/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline-sm text-headline-sm">Service status snapshot</h3>
          <Link
            to="/admin/services"
            className="text-primary-container text-xs font-bold uppercase hover:underline"
          >
            Pamahalaan
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { label: 'Emergency Room', status: 'open', count: 14 },
            { label: 'OB-GYN OPD', status: 'open', count: 12 },
            { label: 'Pediatrics', status: 'open', count: 9 },
            { label: 'MRI #1', status: 'down', count: 0 },
          ].map((s) => (
            <div key={s.label} className="bg-surface-variant/30 rounded-lg p-3">
              <p className="text-xs text-on-surface-variant">{s.label}</p>
              <p className="font-bold text-on-surface mt-1">{s.count} ngayon</p>
              <span
                className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  s.status === 'open'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    s.status === 'open' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
