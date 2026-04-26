import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import Wordmark from '../../components/shared/Wordmark.jsx';
import { currentPatient } from '../../data/patients.js';

const categories = [
  {
    icon: 'person_edit',
    label: 'Manual na Form',
    description: 'I-input ang iyong sintomas.',
    tone: 'bg-surface-container text-primary-container',
    to: '/patient/condition-form',
  },
  {
    icon: 'calendar_month',
    label: 'Iskedyul',
    description: 'Tingnan ang iyong iskedyul o magdagdag ng bago.',
    tone: 'bg-tertiary-fixed text-tertiary',
    to: '/patient/schedule',
  },
];

export default function PatientHome() {
  const defaultAddress = 'Sampaloc, Manila';
  const [address, setAddress] = useState(defaultAddress);
  const [draftAddress, setDraftAddress] = useState(defaultAddress);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    const savedAddress = window.localStorage.getItem('patientAddress');
    if (savedAddress) {
      setAddress(savedAddress);
      setDraftAddress(savedAddress);
    }
  }, []);

  const openAddressEditor = () => {
    setDraftAddress(address);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    const cleanedAddress = draftAddress.trim();
    if (!cleanedAddress) return;
    setAddress(cleanedAddress);
    window.localStorage.setItem('patientAddress', cleanedAddress);
    setShowAddressModal(false);
  };

  return (
    <PatientShell>
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-container via-primary-container to-primary-container/95 rounded-b-[22px] shadow-[0_10px_28px_rgba(0,0,0,0.22)] header-emboss w-full sticky top-0 z-30 flex justify-between items-center px-4 sm:px-5 h-16 border-b border-white/15 backdrop-blur-sm">
        <div className="flex items-center">
          <Wordmark size="md" tone="light" />
        </div>
        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={openAddressEditor}
            className="bg-white/15 border border-white/25 rounded-full py-1.5 pl-2.5 pr-2 hidden sm:flex items-center gap-1.5 cursor-pointer hover:bg-white/25 transition-colors"
          >
            <Icon name="location_on" className="text-white/95" size={15} />
            <span className="text-[10px] font-semibold tracking-wide text-white uppercase max-w-[135px] truncate">
              {address}
            </span>
            <Icon name="arrow_drop_down" className="text-white/95" size={16} />
          </button>
          <Link
            to="/patient/notifications"
            className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center hover:bg-white/25 transition-colors relative"
          >
            <Icon name="notifications" className="text-white" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>
          <Link
            to="/patient/profile"
            className="w-9 h-9 rounded-full bg-white/15 border border-white/35 flex items-center justify-center text-white text-xs font-bold shadow-inner shadow-white/10 hover:bg-white/25 transition-colors"
          >
            {currentPatient.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </Link>
        </div>
      </header>

      <main className="px-container-padding py-stack-lg space-y-stack-lg screen-enter">
        {/* Greeting */}
        <div>
          <h1 className="font-display-md font-bold text-[36px] leading-[1.05] text-on-surface">
            Kumusta, <span className="text-[#7A1C1C]">{currentPatient.name.split(' ')[0]}</span>?
          </h1>
        </div>

        {/* Search */}
        <Link
          to="/patient/triage"
          className="relative w-full block group"
        >
          <div className="w-full min-h-14 rounded-2xl bg-white border-2 border-primary-container/20 flex items-center px-4 pr-14 py-2 shadow-card group-hover:border-primary-container/40 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all">
            <Icon name="smart_toy" className="text-primary-container mr-3" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wide text-primary-container">
                AI Assistant
              </span>
              <span className="text-[13px] text-on-surface-variant leading-tight">
                I-chat ang sintomas ninyo para sa mabilis na gabay
              </span>
            </div>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white shadow-sm">
            <Icon name="mic" filled />
          </div>
        </Link>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              className="h-[150px] flex flex-col items-center justify-center gap-2 p-3 bg-white rounded-xl border-2 border-[#CFCFD4] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-primary-container hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border border-black/10 shadow-sm ${c.tone}`}
              >
                <Icon name={c.icon} size={24} />
              </div>
              <div className="text-center leading-tight">
                <span className="block font-extrabold text-[14px] text-primary-container">{c.label}</span>
                {c.description && (
                  <span className="block mt-0.5 text-[10px] text-on-surface-variant">{c.description}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Promo banner */}
        <Link
          to="/patient/search"
          className="block group bg-gradient-to-br from-primary-container via-[#7f1f1f] to-[#5f1414] rounded-2xl p-stack-lg text-white shadow-hero relative overflow-hidden border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(60,0,0,0.35)]"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -left-8 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="relative z-10 space-y-stack-sm">
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              Real-time update
            </span>
            <h2 className="font-headline-sm text-headline-sm font-extrabold">Walang oras na masasayang…</h2>
            <p className="font-body-md text-body-md text-white/95">
              I-check ang pinakamalapit na ospital at ang pila ngayon.
            </p>
            <span className="block w-fit mx-auto mt-2 bg-white text-primary-container font-extrabold px-5 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
              Hanapin ngayon
            </span>
          </div>
        </Link>

        {/* Health tips peek */}
        <section className="space-y-stack-md">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm font-extrabold">Basahin</h3>
            <Link to="/patient/tips" className="text-primary-container font-label-bold text-label-bold">
              Tingnan lahat →
            </Link>
          </div>
          <Link
            to="/patient/tips"
            className="block bg-white rounded-xl p-4 shadow-card hover:shadow-md transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-container">
              Klima at Kalusugan · 4 min basahin
            </span>
            <h4 className="font-bold mt-1">Mainit na panahon? Paano umiwas sa heat-related illness.</h4>
            <p className="text-on-surface-variant text-sm mt-1">
              Simpleng gabay para sa hydration, tamang pahinga, at pagprotekta sa vulnerable na kasama sa bahay.
            </p>
          </Link>
          <Link
            to="/patient/tips"
            className="block bg-white rounded-xl p-4 shadow-card hover:shadow-md transition-all"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-container">
              Klima at Kalusugan · 3 min basahin
            </span>
            <h4 className="font-bold mt-1">Panahon ng ulan? Iwas-leptospirosis at water-borne disease.</h4>
            <p className="text-on-surface-variant text-sm mt-1">
              Alamin kung kailan dapat magpatingin, at mga simpleng pag-iingat pagkatapos ng baha o maruming tubig.
            </p>
          </Link>
        </section>
      </main>

      <div className="sticky ml-auto mr-5 bottom-5 z-40 w-fit space-y-2">
        <Link
          to="/patient/triage"
          title="Kumusta ka? Chatbot"
          aria-label="Kumusta ka? Chatbot"
          className="relative w-14 h-14 bg-primary-container hover:opacity-90 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        >
          <Icon name="smart_toy" size={24} />
          <span className="absolute right-0 bottom-16 bg-gradient-to-r from-white to-[#fff6f6] border border-primary-container/25 text-primary-container text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-[0_8px_18px_rgba(122,28,28,0.25)] whitespace-nowrap">
            <span className="absolute inset-0 rounded-full border border-primary-container/35 animate-ping opacity-40" />
            <span className="relative z-10 inline-flex items-center gap-1">
              <Icon name="chat_bubble" size={11} />
              Kumusta ka?
            </span>
            <span className="absolute right-4 -bottom-[5px] w-2.5 h-2.5 bg-white border-r border-b border-primary-container/25 rotate-45" />
          </span>
        </Link>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="w-full max-w-xs bg-white rounded-2xl p-4 space-y-3">
            <h3 className="text-base font-bold text-on-surface">Customize address</h3>
            <input
              value={draftAddress}
              onChange={(e) => setDraftAddress(e.target.value)}
              className="w-full border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-container"
              placeholder="Enter your address"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveAddress}
                className="px-3 py-2 rounded-lg text-sm font-bold bg-primary-container text-white hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </PatientShell>
  );
}
