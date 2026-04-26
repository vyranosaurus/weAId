import { Link, useLocation, useNavigate } from 'react-router-dom';
import Wordmark from '../../components/shared/Wordmark.jsx';
import Icon from '../../components/shared/Icon.jsx';

export default function PatientLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromLanding = Boolean(location.state?.fromLanding);
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] py-3 md:py-6">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1 bg-[#F5F5F5] rounded-[34px] border-[8px] border-[#1D1D1F] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.25)] relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-[#2e2e31] z-30" />
        <div className={`flex flex-col flex-1 ${fromLanding ? 'screen-enter' : ''}`}>
          {/* Hero */}
          <div className="bg-primary-container rounded-b-[20px] shadow-hero px-container-padding pt-12 pb-8">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white text-sm font-bold uppercase tracking-wider">
            <Icon name="arrow_back" size={18} />
            <span className="ml-1">Bumalik</span>
          </Link>
          <div className="mt-6 text-center space-y-1.5">
            <Wordmark size="md" tone="light" />
            <h1 className="font-display-md text-display-md text-white mt-3 tracking-[0.01em] leading-tight">
              Maligayang pagbabalik!
            </h1>
            <p className="font-body-md text-body-md text-white/85 mt-1 tracking-[0.015em]">
              Pumasok sa account ninyo.
            </p>
          </div>
          </div>

          {/* Form */}
          <div className={`px-container-padding -mt-6 pb-stack-lg ${fromLanding ? 'login-form-rise' : ''}`}>
            <div className="bg-white rounded-xl shadow-card p-5 space-y-stack-md">
            {/* Tabs */}
            <div className="flex bg-surface-variant/50 rounded-full p-1">
              <button className="flex-1 py-2 rounded-full bg-white text-primary-container font-label-bold text-label-bold shadow-sm">
                MOBILE NO.
              </button>
              <button className="flex-1 py-2 rounded-full text-on-surface-variant font-label-bold text-label-bold">
                EMAIL
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-3 py-3 border border-outline-variant/30">
              <span className="font-bold text-on-surface">+63</span>
              <input
                type="tel"
                defaultValue="917 555 0188"
                className="flex-1 bg-transparent border-none focus:outline-none text-on-surface placeholder:text-on-surface-variant/60"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-3 py-3 border border-outline-variant/30">
              <Icon name="lock" className="text-on-surface-variant" />
              <input
                type="password"
                defaultValue="••••••••"
                className="flex-1 bg-transparent border-none focus:outline-none text-on-surface"
              />
              <Icon name="visibility_off" className="text-on-surface-variant" />
            </div>

            <div className="flex justify-between items-center text-label-bold font-label-bold">
              <label className="flex items-center gap-2 text-on-surface-variant">
                <input type="checkbox" defaultChecked className="rounded text-primary-container" />
                Tandaan ako
              </label>
              <a href="#" className="text-primary-container">
                Nakalimutan?
              </a>
            </div>

            <button
              onClick={() => navigate('/patient/home')}
              className="w-full bg-primary-container text-white font-label-bold text-label-bold uppercase py-4 rounded-full hover:bg-[#600000] transition-all active:scale-95 shadow-card"
            >
              Pumasok
            </button>

            <div className="flex items-center gap-3 text-on-surface-variant text-xs">
              <div className="flex-1 h-px bg-outline-variant/40" />
              <span>o kaya</span>
              <div className="flex-1 h-px bg-outline-variant/40" />
            </div>

            <button
              onClick={() => navigate('/patient/home')}
              className="w-full bg-white border-[1.5px] border-primary-container text-primary-container font-label-bold text-label-bold uppercase py-4 rounded-full hover:bg-primary-container/5 transition-all flex items-center justify-center gap-2"
            >
              <Icon name="sms" size={16} />
              Magpadala ng OTP
            </button>

            <button
              onClick={() => navigate('/patient/home')}
              className="w-full text-on-surface-variant font-label-bold text-label-bold uppercase py-3 hover:text-primary-container"
            >
              Magpatuloy bilang Bisita
            </button>
          </div>

            <p className="text-center text-on-surface-variant text-sm mt-4">
              Wala pang account?{' '}
              <a href="#" className="text-primary-container font-bold">
                Mag-sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
