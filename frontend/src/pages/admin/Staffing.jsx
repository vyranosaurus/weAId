import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { aiInsights } from '../../data/admin.js';

const staffPerDept = [
  { dept: 'Emergency Room', current: 8, target: 10, status: 'short', shift: 'AM' },
  { dept: 'OB-GYN', current: 4, target: 6, status: 'short', shift: 'AM' },
  { dept: 'Pediatrics', current: 5, target: 5, status: 'ok', shift: 'AM' },
  { dept: 'Internal Medicine', current: 6, target: 5, status: 'over', shift: 'AM' },
  { dept: 'Surgery', current: 4, target: 4, status: 'ok', shift: 'AM' },
  { dept: 'Pharmacy', current: 3, target: 4, status: 'short', shift: 'AM' },
];

export default function Staffing() {
  return (
    <AdminShell breadcrumb="Staffing">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Staffing</h1>
          <p className="text-on-surface-variant text-sm">
            AI-driven staffing recommendations · live ratios
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="schedule" size={16} className="inline mr-1" /> Shift planner
          </button>
          <button className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="auto_awesome" size={16} className="inline mr-1" /> Apply all AI suggestions
          </button>
        </div>
      </div>

      {/* Top KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KCard label="Total on shift" value="58" sub="of 64 target" />
        <KCard label="Open positions" value="6" sub="across 4 depts" tone="amber" />
        <KCard label="Overtime hrs" value="142" sub="this week" tone="red" />
        <KCard label="Avg hrs / staff" value="9.4" sub="this shift" />
      </div>

      {/* AI Insights expanded */}
      <div className="bg-white rounded-xl shadow-card border border-primary-container/20 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
        <h2 className="font-headline-sm text-headline-sm flex items-center gap-2 mb-4">
          <span className="font-ai-signature font-black text-primary-container ai-glow-dark text-2xl">
            AI
          </span>{' '}
          Staffing Insights
        </h2>
        <div className="space-y-3">
          {aiInsights.map((ins) => (
            <div
              key={ins.id}
              className="bg-surface-variant/20 rounded-lg p-4 flex items-start gap-3 border border-outline-variant/20"
            >
              <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0">
                <Icon name="auto_awesome" size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-on-surface">{ins.text}</p>
                <p className="text-xs text-emerald-700 mt-1">Impact: {ins.impact}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-primary-container text-white px-3 py-2 rounded-full text-[11px] font-bold uppercase">
                  Apply
                </button>
                <button className="bg-white border border-outline-variant text-on-surface px-3 py-2 rounded-full text-[11px] font-bold uppercase">
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per dept staffing */}
      <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden">
        <div className="px-5 py-4 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm">Staffing per department · AM shift</h3>
          <button className="text-xs font-bold uppercase text-primary-container">View shift schedule</button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant bg-surface-variant/30">
            <tr>
              <th className="text-left px-5 py-2">Department</th>
              <th className="text-left py-2">Current</th>
              <th className="text-left py-2">Target</th>
              <th className="text-left py-2">Ratio</th>
              <th className="text-left py-2">Status</th>
              <th className="text-right px-5 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffPerDept.map((s) => {
              const tones = {
                ok: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'OK' },
                short: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'KULANG' },
                over: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'SOBRA' },
              }[s.status];
              const ratioPct = Math.round((s.current / s.target) * 100);
              return (
                <tr
                  key={s.dept}
                  className="border-b border-outline-variant/20 last:border-0 hover:bg-surface-variant/30"
                >
                  <td className="px-5 py-3 font-bold">{s.dept}</td>
                  <td className="py-3">{s.current}</td>
                  <td className="py-3">{s.target}</td>
                  <td className="py-3 w-40">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-surface-variant/60 overflow-hidden">
                        <div
                          className={`h-full ${
                            ratioPct < 90
                              ? 'bg-amber-500'
                              : ratioPct > 110
                              ? 'bg-blue-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(ratioPct, 130)}%` }}
                        />
                      </div>
                      <span className="text-xs">{ratioPct}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-full ${tones.bg} ${tones.text}`}
                    >
                      {tones.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="text-primary-container text-xs font-bold uppercase">
                      Manage
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function KCard({ label, value, sub, tone = 'gray' }) {
  const map = {
    gray: 'text-on-surface',
    amber: 'text-amber-700',
    red: 'text-red-600',
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">{label}</p>
      <p className={`text-display-md font-bold mt-1 ${map[tone]}`}>{value}</p>
      <p className="text-xs text-on-surface-variant">{sub}</p>
    </div>
  );
}
