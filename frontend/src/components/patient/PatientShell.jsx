import BottomNav from './BottomNav.jsx';

export default function PatientShell({ children, hideNav = false, className = '' }) {
  return (
    <div className="h-screen overflow-hidden bg-transparent py-3 md:py-6">
      <div
        className={`relative max-w-md mx-auto h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] bg-[#F5F5F5] rounded-[34px] border-[8px] border-[#1D1D1F] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.25)] ${
          hideNav ? '' : 'pb-20'
        } ${className}`}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-[#2e2e31] z-30" />
        <div className="h-full overflow-y-auto no-scrollbar">
          {children}
        </div>
        {!hideNav && <BottomNav className="absolute bottom-0 left-0 right-0" />}
      </div>
    </div>
  );
}
