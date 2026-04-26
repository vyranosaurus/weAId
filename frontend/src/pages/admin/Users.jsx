import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { adminUsers, roleStyles } from '../../data/admin.js';

const statusStyles = {
  active: 'bg-emerald-100 text-emerald-700',
  invited: 'bg-amber-100 text-amber-700',
  suspended: 'bg-red-100 text-red-700',
};

export default function Users() {
  return (
    <AdminShell breadcrumb="Users & Roles">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="font-display-md text-display-md">Users & Roles</h1>
          <p className="text-on-surface-variant text-sm">
            Pamahalaan kung sino ang nakakagamit ng weAId admin para sa PGH
          </p>
        </div>
        <button className="bg-primary-container text-white px-5 py-2 rounded-full text-xs font-bold uppercase">
          <Icon name="person_add" size={16} className="inline mr-1" /> Mag-imbita
        </button>
      </div>

      {/* Role distribution */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <RoleCard role="Admin" count="2" desc="Full access" />
        <RoleCard role="Doctor" count="14" desc="Patient + queue" />
        <RoleCard role="Triage Nurse" count="8" desc="Triage + queue" />
        <RoleCard role="Receptionist" count="6" desc="Queue only" />
        <RoleCard role="Read-only" count="3" desc="View only" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <input
          placeholder="Hanapin ng pangalan / email / dept…"
          className="flex-1 min-w-[240px] bg-white border border-outline-variant rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-container"
        />
        <select className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
          <option>All roles</option>
          <option>Admin</option>
          <option>Doctor</option>
          <option>Nurse</option>
        </select>
        <select className="bg-white border border-outline-variant px-4 py-2 rounded-full text-xs font-bold uppercase">
          <option>All depts</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-on-surface-variant bg-surface-variant/30 border-b border-outline-variant/30">
            <tr>
              <th className="text-left px-5 py-3">Pangalan</th>
              <th className="text-left py-3">Role</th>
              <th className="text-left py-3">Department</th>
              <th className="text-left py-3">Email</th>
              <th className="text-left py-3">Status</th>
              <th className="text-left py-3">Last active</th>
              <th className="text-right px-5 py-3">Aksyon</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((u) => (
              <tr
                key={u.id}
                className="border-b border-outline-variant/20 last:border-0 hover:bg-surface-variant/30"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center font-bold">
                      {u.name[0]}
                    </div>
                    <span className="font-bold">{u.name}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${roleStyles[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 text-xs">{u.dept}</td>
                <td className="py-3 text-xs text-on-surface-variant">{u.email}</td>
                <td className="py-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${statusStyles[u.status]}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3 text-xs">{u.lastActive}</td>
                <td className="px-5 py-3 text-right">
                  <button className="text-primary-container text-xs font-bold uppercase mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 text-xs font-bold uppercase">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-on-surface-variant">
        Showing {adminUsers.length} of 33 users · last 30 days only
      </p>
    </AdminShell>
  );
}

function RoleCard({ role, count, desc }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-card text-center">
      <p className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full inline-block ${roleStyles[role]}`}>
        {role}
      </p>
      <p className="text-display-md font-bold mt-2 text-on-surface">{count}</p>
      <p className="text-xs text-on-surface-variant">{desc}</p>
    </div>
  );
}
