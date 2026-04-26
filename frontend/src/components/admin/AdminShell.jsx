import RailNav from './RailNav.jsx';
import AdminTopBar from './AdminTopBar.jsx';

export default function AdminShell({ breadcrumb, children }) {
  return (
    <div className="min-h-screen bg-transparent py-3 md:py-6 px-2">
      <div className="relative max-w-[1440px] mx-auto w-full h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] rounded-[24px] border-[10px] border-[#1D1D1F] overflow-hidden shadow-[0_24px_55px_rgba(0,0,0,0.28)] bg-[#F5F5F5]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-1.5 rounded-full bg-[#2e2e31] z-50" />
        <div className="text-on-surface flex h-full overflow-hidden bg-transparent">
          <RailNav />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <AdminTopBar breadcrumb={breadcrumb} />
            <main className="flex-1 overflow-y-auto p-container-padding">
              <section className="max-w-7xl mx-auto space-y-stack-lg">
                {children}
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
