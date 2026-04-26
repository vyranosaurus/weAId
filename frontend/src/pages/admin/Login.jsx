import { Link, useNavigate } from 'react-router-dom';
import Wordmark from '../../components/shared/Wordmark.jsx';
import Icon from '../../components/shared/Icon.jsx';
import mobileLoginBg from '../../assets/mobile_login.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F5F5] py-3 md:py-6 px-2">
      <div className="relative max-w-[1440px] mx-auto w-full h-[calc(100vh-1.5rem)] md:h-[calc(100vh-3rem)] rounded-[24px] border-[10px] border-[#1D1D1F] overflow-hidden shadow-[0_24px_55px_rgba(0,0,0,0.28)] bg-[#F5F5F5]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-36 h-1.5 rounded-full bg-[#2e2e31] z-40" />
        <div className="h-full flex bg-[#F5F5F5]">
          {/* Left brand panel */}
          <div
            className="flex flex-col justify-between w-1/2 text-white p-12 relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${mobileLoginBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#410000]/78 via-[#570000]/84 to-[#410000]/92" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(45, 0, 0, 0.76)' }} />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.14),transparent_40%)] animate-pulse-slow" />
            <div className="relative z-10">
              <Wordmark size="md" tone="light" aiTone="maroon" />
              <p className="text-white/80 text-sm mt-2">Hospital Partner Portal</p>
            </div>
            <div className="relative z-10 space-y-6">
              <div>
                <p className="font-display-lg text-display-lg font-black leading-tight">
                  Right <span className="text-[#5f1414] [text-shadow:0_0_1px_rgba(255,255,255,0.95),0_0_6px_rgba(255,255,255,0.35)]">care</span>, <br /> Right{' '}
                  <span className="text-[#5f1414] [text-shadow:0_0_1px_rgba(255,255,255,0.95),0_0_6px_rgba(255,255,255,0.35)]">hospital</span>, <br /> Right{' '}
                  <span className="text-[#5f1414] [text-shadow:0_0_1px_rgba(255,255,255,0.95),0_0_6px_rgba(255,255,255,0.35)]">time</span>.
                </p>
                <p className="text-white/80 text-lg mt-4">
                  Mas mabilis na pila. Mas matagumpay na outcome. Para sa pasyente at sa inyong staff.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Stat label="Active hospitals" value="38" />
                <Stat label="Patients today" value="12,481" />
                <Stat label="Avg wait saved" value="47 min" />
              </div>
              <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm p-4">
                <p className="text-[10px] uppercase tracking-wider text-white/80 font-bold">Live platform health</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="font-bold">All services operational</span>
                </div>
              </div>
            </div>
            <div className="relative z-10 text-xs text-white/60">
              © 2026 weAId · Privacy · Terms
            </div>
          </div>

          {/* Right form panel */}
          <div className="w-1/2 flex flex-col justify-center px-6 lg:px-16 py-10 overflow-y-auto">
            <div className="hidden mb-6">
              <Wordmark size="md" tone="dark" />
            </div>

            <h1 className="font-display-md text-display-md text-on-surface">
              Sign in to We
              <span className="font-ai-signature font-black text-primary-container">AI</span>
              d
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">Hospital admin portal — secure access</p>
            <div className="mt-8 max-w-md space-y-4 bg-white/90 border border-outline-variant/30 shadow-card rounded-2xl p-5">
              <Input label="Hospital ID" defaultValue="PGH-001" icon="local_hospital" />
              <Input label="Email" defaultValue="a.reyes@pgh.gov.ph" icon="mail" />
              <Input label="Password" defaultValue="••••••••" icon="lock" type="password" />

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-on-surface-variant">
                  <input type="checkbox" defaultChecked className="rounded text-primary-container" />
                  Tandaan ang device
                </label>
                <a href="#" className="text-primary-container font-bold">
                  Nakalimutan?
                </a>
              </div>

              <button
                onClick={() => navigate('/admin/queue')}
                className="w-full bg-primary-container text-white py-4 rounded-full font-label-bold text-label-bold uppercase shadow-card hover:bg-[#600000] active:scale-95 transition-all"
              >
                Pumasok
              </button>

              <div className="flex items-center gap-3 text-on-surface-variant text-xs">
                <div className="flex-1 h-px bg-outline-variant/40" />
                <span>o kaya</span>
                <div className="flex-1 h-px bg-outline-variant/40" />
              </div>

              <button className="w-full bg-white border-[1.5px] border-outline-variant text-on-surface py-4 rounded-full font-label-bold text-label-bold uppercase flex justify-center items-center gap-2 hover:border-primary-container">
                <Icon name="badge" size={18} /> Single Sign-On (SSO)
              </button>
            </div>

            <p className="text-xs text-on-surface-variant mt-8">
              Para sa support, email{' '}
              <a href="mailto:partners@weaid.ph" className="text-primary-container font-bold">
                partners@weaid.ph
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-white/70">{label}</p>
      <p className="font-display-md text-display-md font-black">{value}</p>
    </div>
  );
}

function Input({ label, defaultValue, icon, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-2 bg-white border border-outline-variant rounded-xl px-3 py-3 focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container">
        <Icon name={icon} className="text-on-surface-variant" size={20} />
        <input
          type={type}
          defaultValue={defaultValue}
          className="flex-1 bg-transparent border-none focus:outline-none text-on-surface"
        />
      </div>
    </label>
  );
}
