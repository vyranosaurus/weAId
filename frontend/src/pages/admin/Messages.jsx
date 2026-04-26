import AdminShell from '../../components/admin/AdminShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { adminMessages } from '../../data/admin.js';

const sample = [
  { from: 'patient', text: 'Pasensya po, late ako. May traffic sa Taft.', time: '8:42 AM' },
  { from: 'admin', text: 'Walang problema, Maria. Hihintayin ka namin. Tumawag lang sa nurse station kung kailan ka makakarating.', time: '8:43 AM' },
  { from: 'patient', text: 'Salamat po. Sabay nyo na ako sa OB-GYN OPD?', time: '8:43 AM' },
  { from: 'admin', text: 'Opo. May naka-reserve na slot para sa inyo. Ipakita lang ang QR sa pagdating.', time: '8:44 AM' },
];

const templates = [
  'Pasensya po, may delay ng 10 min.',
  'Magdala po ng valid ID.',
  'Naghihintay na po kami.',
  'Pwede po bang i-reschedule?',
];

export default function AdminMessages() {
  return (
    <AdminShell breadcrumb="Messages">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
        {/* Inbox */}
        <aside className="col-span-12 md:col-span-4 xl:col-span-3 bg-white rounded-xl shadow-card border border-outline-variant/20 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-outline-variant/30 flex gap-2">
            <input
              placeholder="Search messages…"
              className="flex-1 bg-[#F5F5F5] border border-outline-variant rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-container"
            />
            <button className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center">
              <Icon name="edit" size={18} />
            </button>
          </div>

          <div className="flex gap-1 px-3 py-2 border-b border-outline-variant/30 text-[11px] font-bold uppercase">
            <button className="bg-primary-container text-white px-3 py-1 rounded-full">All</button>
            <button className="bg-white border border-outline-variant text-on-surface px-3 py-1 rounded-full">
              Unread
            </button>
            <button className="bg-white border border-outline-variant text-on-surface px-3 py-1 rounded-full">
              Pinned
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {adminMessages.map((m, i) => (
              <button
                key={m.id}
                className={`w-full text-left flex items-start gap-3 p-3 border-b border-outline-variant/20 hover:bg-surface-variant/30 ${
                  i === 0 ? 'bg-primary-container/5' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-on-surface text-sm truncate">{m.name}</h4>
                    <span className="text-[10px] text-on-surface-variant">{m.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{m.preview}</p>
                  <p className="text-[10px] text-primary-container font-bold uppercase mt-0.5">
                    {m.queue}
                  </p>
                </div>
                {m.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary-container text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {m.unread}
                  </span>
                )}
                {m.pinned && <Icon name="push_pin" size={14} className="text-primary-container shrink-0" />}
              </button>
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <section className="col-span-12 md:col-span-8 xl:col-span-9 bg-white rounded-xl shadow-card border border-outline-variant/20 flex flex-col">
          <div className="px-5 py-3 border-b border-outline-variant/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container/15 text-primary-container flex items-center justify-center font-bold">
                M
              </div>
              <div>
                <h3 className="font-bold">Maria Santos</h3>
                <p className="text-xs text-on-surface-variant">
                  #00187 · OB-GYN consult · ETA on time
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-2 rounded-full hover:bg-surface-variant/40">
                <Icon name="phone" />
              </button>
              <button className="p-2 rounded-full hover:bg-surface-variant/40">
                <Icon name="info" />
              </button>
              <button className="p-2 rounded-full hover:bg-surface-variant/40">
                <Icon name="more_vert" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#FAFAFA]">
            {sample.map((s, i) => (
              <div
                key={i}
                className={`flex ${s.from === 'admin' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[70%]">
                  <div
                    className={`text-sm px-4 py-3 rounded-2xl shadow-sm ${
                      s.from === 'admin'
                        ? 'bg-primary-container text-white rounded-tr-sm'
                        : 'bg-white text-on-surface rounded-tl-sm border border-outline-variant/30'
                    }`}
                  >
                    {s.text}
                  </div>
                  <p
                    className={`text-[10px] text-on-surface-variant mt-1 ${
                      s.from === 'admin' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {s.time} · {s.from === 'admin' ? 'sent' : 'patient'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Templates */}
          <div className="px-5 py-2 border-t border-outline-variant/30 flex gap-2 overflow-x-auto no-scrollbar">
            {templates.map((t) => (
              <button
                key={t}
                className="flex-shrink-0 bg-primary-container/10 text-primary-container border border-primary-container/30 text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-3 border-t border-outline-variant/30 flex items-center gap-3">
            <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full">
              <Icon name="add_circle" />
            </button>
            <input
              placeholder="Magsulat ng mensahe…"
              className="flex-1 bg-[#F5F5F5] border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-container"
            />
            <button className="w-12 h-12 bg-primary-container text-white rounded-full flex items-center justify-center shadow-card">
              <Icon name="send" />
            </button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
