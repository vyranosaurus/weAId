import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';

const weekly = [42, 51, 38, 65, 72, 68, 81];
const services = [
  { name: 'Emergency', visits: 1284, change: '+8%', up: true },
  { name: 'OB-GYN', visits: 612, change: '+22%', up: true },
  { name: 'Pediatrics', visits: 482, change: '-4%', up: false },
  { name: 'Internal Med', visits: 698, change: '+12%', up: true },
  { name: 'Lab', visits: 1422, change: '+5%', up: true },
];

export default function Analytics() {
  return (
    <AdminShell breadcrumb="Analytics">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Analytics</h1>
          <p className="text-on-surface-variant text-sm">
            Trends, patient flow, no-show rates · last 30 days
          </p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>This year</option>
          </select>
          <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="download" size={16} className="inline mr-1" /> Export CSV
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KCard label="Total visits" value="4,498" delta="+12% MoM" />
        <KCard label="No-show rate" value="7%" delta="-2%" emerald />
        <KCard label="Avg wait time" value="38 min" delta="+6 min" amber />
        <KCard label="weAId penetration" value="68%" delta="+14%" />
      </div>

      {/* Main chart */}
      <div className="bg-white rounded-xl p-5 shadow-card border border-outline-variant/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-sm text-headline-sm">Daily visits — last 7 days</h2>
          <div className="flex bg-surface-variant/40 rounded-full p-1">
            {['Visits', 'Wait time', 'No-show'].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold ${
                  i === 0 ? 'bg-white text-primary-container shadow-sm' : 'text-on-surface-variant'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72 flex items-end gap-3">
          {weekly.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-primary-container/20 rounded-t-md relative group">
                <div
                  className="w-full bg-primary-container rounded-t-md transition-all"
                  style={{ height: `${(v / 100) * 240}px` }}
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface bg-white border px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100">
                  {v * 10}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Donut + Top services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-card border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm mb-4">Visit sources</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              <div
                className="w-32 h-32 rounded-full"
                style={{
                  background:
                    'conic-gradient(#800000 0% 68%, #9A1919 68% 88%, #dcdddd 88% 100%)',
                }}
              />
              <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center">
                <span className="font-display-md text-display-md text-primary-container">68%</span>
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                  via weAId
                </span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Legend color="bg-primary-container" label="weAId AI" pct="68%" />
              <Legend color="bg-primary-fixed-dim" label="Walk-in" pct="20%" />
              <Legend color="bg-surface-variant" label="Referral" pct="12%" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm mb-3">Top services</h3>
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
              <tr>
                <th className="text-left py-2">Service</th>
                <th className="text-left py-2">Visits</th>
                <th className="text-left py-2">vs prev period</th>
                <th className="text-right py-2">Trend</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.name} className="border-b border-outline-variant/20 last:border-0">
                  <td className="py-3 font-bold">{s.name}</td>
                  <td className="py-3">{s.visits.toLocaleString()}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        s.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {s.change}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Icon
                      name={s.up ? 'trending_up' : 'trending_down'}
                      className={s.up ? 'text-emerald-500' : 'text-red-500'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminShell>
  );
}

function KCard({ label, value, delta, emerald, amber }) {
  const tone = emerald
    ? 'bg-emerald-100 text-emerald-700'
    : amber
    ? 'bg-amber-100 text-amber-700'
    : 'bg-blue-100 text-blue-700';
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <span className="font-display-md text-display-md text-on-surface">{value}</span>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${tone}`}>{delta}</span>
      </div>
    </div>
  );
}

function Legend({ color, label, pct }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="font-bold text-on-surface text-xs">{label}</span>
      <span className="text-on-surface-variant text-xs">{pct}</span>
    </div>
  );
}
