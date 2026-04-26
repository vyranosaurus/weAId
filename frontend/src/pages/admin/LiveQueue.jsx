import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { queuePatients, priorityStyles } from '../../data/patients.js';

const statusStyles = {
  waiting: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'NAGHIHINTAY' },
  'in-consult': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'KONSULTA' },
  done: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'TAPOS' },
};

export default function LiveQueue() {
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  function handleManualAddSubmit(event) {
    event.preventDefault();
    setShowAddModal(false);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 1800);
  }

  return (
    <AdminShell breadcrumb="Live Queue">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md text-on-surface">Live Queue</h1>
          <p className="text-on-surface-variant text-sm">
            Real-time view ng lahat ng pasyente sa ospital — synced 2s ago
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-outline-variant text-on-surface px-4 py-2 rounded-full text-xs font-bold uppercase">
            <Icon name="filter_list" size={16} className="inline mr-1" /> Filter
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-container text-white px-4 py-2 rounded-full text-xs font-bold uppercase"
          >
            <Icon name="add" size={16} className="inline mr-1" /> Manual add
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'Lahat', count: queuePatients.length },
          { id: 'critical', label: 'Critical', count: 1 },
          { id: 'urgent', label: 'Urgent', count: 3 },
          { id: 'waiting', label: 'Waiting', count: 5 },
          { id: 'in-consult', label: 'In consult', count: 2 },
          { id: 'weAId', label: 'via weAId', count: 6 },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === t.id
                ? 'bg-primary-container text-white shadow-card'
                : 'bg-white text-on-surface border border-outline-variant'
            }`}
          >
            {t.label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filter === t.id ? 'bg-white/25' : 'bg-surface-variant'
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant bg-surface-variant/30 border-b border-outline-variant/30">
              <tr>
                <th className="text-left px-5 py-3">Q#</th>
                <th className="text-left py-3">Patient</th>
                <th className="text-left py-3">Reklamo</th>
                <th className="text-left py-3">Service / Room</th>
                <th className="text-left py-3">Wait</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Priority</th>
                <th className="text-right px-5 py-3">Aksyon</th>
              </tr>
            </thead>
            <tbody>
              {queuePatients.map((p) => {
                const sP = priorityStyles[p.priority];
                const sS = statusStyles[p.status];
                return (
                  <tr
                    key={p.id}
                    className="border-b border-outline-variant/20 last:border-0 hover:bg-surface-variant/30 transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-xs font-bold text-primary-container">
                      #{p.id}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/patient/${p.id}`}
                          className="font-bold text-on-surface hover:text-primary-container"
                        >
                          {p.name}
                        </Link>
                        {p.fromWeAId && (
                          <span className="text-[10px] font-ai-signature font-black text-primary-container ai-glow-dark">
                            AI
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        {p.age} y/o · {p.sex}
                      </p>
                    </td>
                    <td className="py-3 text-xs max-w-[220px] truncate">{p.complaint}</td>
                    <td className="py-3 text-xs">{p.service}</td>
                    <td className="py-3 text-xs font-bold">{p.waitMin} min</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${sS.bg} ${sS.text}`}>
                        {sS.label}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${sP.bg} ${sP.text}`}>
                        {sP.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 rounded-full hover:bg-surface-variant/50">
                          <Icon name="campaign" className="text-primary-container" size={18} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-surface-variant/50">
                          <Icon name="more_vert" size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-on-surface-variant text-center">
        Showing {queuePatients.length} of 142 patients · Auto-refresh every 2s
      </div>

      {showAddedToast && (
        <div className="fixed top-6 right-6 z-[85] bg-primary-container text-white px-4 py-2 rounded-full shadow-hero text-xs font-bold uppercase tracking-wider">
          Patient added to queue
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-hero border border-outline-variant/30 overflow-hidden">
            <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Manual Add Patient</h3>
                <p className="text-xs text-on-surface-variant">Ilagay ang details para maisama sa live queue.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-variant/50 flex items-center justify-center text-on-surface-variant"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Field label="Patient name" defaultValue="Juan Dela Cruz" />
                <Field label="Age" defaultValue="34" />
                <Field label="Sex" defaultValue="Male" />
                <Field label="Contact no." defaultValue="0917 555 0110" />
              </div>

              <label className="block">
                <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
                  Chief complaint
                </span>
                <textarea
                  defaultValue="Mataas na lagnat at hirap huminga."
                  className="mt-1 w-full bg-[#F5F5F5] border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm min-h-[88px] focus:outline-none focus:border-primary-container"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SelectField
                  label="Priority"
                  defaultValue="urgent"
                  options={[
                    { value: 'critical', label: 'Critical' },
                    { value: 'urgent', label: 'Urgent' },
                    { value: 'routine', label: 'Routine' },
                  ]}
                />
                <SelectField
                  label="Status"
                  defaultValue="waiting"
                  options={[
                    { value: 'waiting', label: 'Waiting' },
                    { value: 'in-consult', label: 'In consult' },
                  ]}
                />
                <SelectField
                  label="Service"
                  defaultValue="ER"
                  options={[
                    { value: 'ER', label: 'Emergency Room' },
                    { value: 'OPD', label: 'OPD - IM' },
                    { value: 'Pedia', label: 'Pediatrics' },
                  ]}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-outline-variant text-on-surface text-xs font-bold uppercase hover:bg-surface-variant/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary-container text-white text-xs font-bold uppercase hover:bg-[#600000]"
                >
                  Add to queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, defaultValue }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="mt-1 w-full bg-[#F5F5F5] border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-container"
      />
    </label>
  );
}

function SelectField({ label, defaultValue, options }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
        {label}
      </span>
      <select
        defaultValue={defaultValue}
        className="mt-1 w-full bg-[#F5F5F5] border border-outline-variant/40 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary-container"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
