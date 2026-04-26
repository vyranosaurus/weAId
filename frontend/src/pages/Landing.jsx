import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Wordmark from '../components/shared/Wordmark.jsx';
import Icon from '../components/shared/Icon.jsx';
import mobileLoginBg from '../assets/mobile_login.png';

export default function Landing() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  function goToPatientLogin() {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate('/login/patient', { state: { fromLanding: true } });
    }, 340);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] py-3 md:py-6">
      <div
        className={`max-w-md mx-auto w-full flex flex-col flex-1 bg-[#F5F5F5] rounded-[34px] border-[8px] border-[#1D1D1F] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.25)] relative ${
          isExiting ? 'landing-exit' : ''
        }`}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-[#2e2e31] z-30" />
        {/* Hero */}
        <div
          className="relative rounded-b-[30px] shadow-hero flex flex-col items-center justify-center px-container-padding pt-16 pb-12 min-h-[58vh] overflow-hidden border-b border-white/20"
        >
          <div
            className="absolute inset-0 hero-kenburns"
            style={{ backgroundImage: `url(${mobileLoginBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#410000]/82 via-[#570000]/86 to-[#410000]/92" />
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45, 0, 0, 0.76)' }} />
          <div className="absolute inset-0 hero-maroon-sweep" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_-18px_40px_rgba(0,0,0,0.35),inset_0_10px_30px_rgba(255,255,255,0.08)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="text-center z-10 space-y-stack-md flex flex-col items-center">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider border border-white/30">
              Filipino-first health navigation
            </span>
            <Wordmark size="xl" tone="light" aiTone="maroon" />
            <p className="font-headline-sm text-headline-sm text-white/90 max-w-[280px] mt-stack-md">
              <span className="text-white">Right Care</span>{' '}
              <span className="text-white/90">starts with the</span>{' '}
              <span className="text-white">Right Direction.</span>
            </p>
          </div>
        </div>

        <div className="relative z-20 -mt-10 mb-2 flex justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-white/92 border-[3px] border-white shadow-[0_14px_30px_rgba(0,0,0,0.3)] flex items-center justify-center animate-pulse">
            <div className="absolute w-24 h-24 rounded-full border-2 border-white/55 animate-ping" />
            <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center shadow-[inset_0_2px_5px_rgba(255,255,255,0.35),inset_0_-6px_10px_rgba(0,0,0,0.22),0_6px_14px_rgba(0,0,0,0.35)]">
              <Icon name="health_and_safety" size={24} />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex-1 flex flex-col items-center justify-between px-container-padding py-stack-lg space-y-stack-lg">
          <div className="w-full mt-8 rounded-2xl bg-white border border-outline-variant/30 shadow-card p-4 space-y-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {['Libre gamitin', 'AI-assisted', 'Mabilis na referral'].map((tag) => (
                <span
                  key={tag}
                  className="shrink-0 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container text-[10px] font-bold uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={goToPatientLogin}
              className="w-full bg-primary-container text-white font-label-bold text-label-bold py-4 rounded-full shadow-card active:scale-95 transition-all uppercase flex justify-center items-center gap-2 hover:bg-[#600000] hover:shadow-hero"
            >
              Magpatuloy
              <Icon name="arrow_forward" size={16} />
            </button>
            <p className="text-[11px] text-on-surface-variant text-center">
              Priority care matching gamit ang maroon severity signals.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-bold text-label-bold pt-stack-lg bg-white/80 border border-outline-variant/30 rounded-full px-4 py-2 shadow-card">
            <button className="hover:text-primary-container transition-colors">ENGLISH</button>
            <span className="text-secondary-fixed-dim">|</span>
            <button className="text-primary-container">FILIPINO</button>
          </div>
        </div>
        <div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#2f0000]/0 via-[#800000]/0 to-[#600000]/0 ${
            isExiting ? 'landing-wipe' : ''
          }`}
        />
      </div>
    </div>
  );
}
