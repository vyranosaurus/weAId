import { Link } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { recommendation } from '../../data/triage.js';

export default function ServiceRecommendation() {
  return (
    <PatientShell hideNav>
      <PatientHeader title="Suriin" subtitle="Resulta ng AI" />

      <main className="px-container-padding py-stack-lg space-y-stack-lg">
        {/* Big rec card */}
        <div className="bg-white rounded-2xl p-stack-lg shadow-card relative overflow-hidden border border-primary-container/20">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-container/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <span className="font-ai-signature font-black ai-glow-dark">AI</span> Recommendation
            </span>
            <h1 className="font-display-md text-display-md text-on-surface mt-3">
              {recommendation.service}
            </h1>
            <span className="inline-block mt-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[11px] font-bold uppercase">
              {recommendation.urgency} · 2 araw na maghintay → tumagal pa
            </span>

            <div className="mt-stack-lg space-y-stack-sm">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <Icon name="psychology" className="text-primary-container" /> Bakit po ito?
              </h3>
              {recommendation.rationale.map((r, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <Icon name="check_circle" className="text-primary-container shrink-0 mt-0.5" size={18} />
                  <p className="text-body-md text-on-surface-variant">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="bg-white rounded-xl p-4 shadow-card">
          <h3 className="font-bold text-on-surface mb-3">Iba pang opsyon</h3>
          {recommendation.alternatives.map((a) => (
            <div key={a.service} className="flex justify-between items-start gap-3 py-3 border-b border-outline-variant/30 last:border-0">
              <div>
                <h4 className="font-bold text-on-surface">{a.service}</h4>
                <p className="text-body-md text-on-surface-variant">{a.reason}</p>
              </div>
              <button className="text-primary-container font-label-bold text-label-bold">PUMILI</button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/patient/results"
          className="block w-full bg-primary-container text-white text-center font-label-bold text-label-bold uppercase py-4 rounded-full shadow-card hover:bg-[#600000] active:scale-95 transition-all"
        >
          Hanapin ang ospital
          <Icon name="arrow_forward" size={16} className="ml-2 inline" />
        </Link>

        <Link
          to="/patient/triage"
          className="block w-full text-center text-on-surface-variant font-label-bold text-label-bold uppercase py-3 hover:text-primary-container"
        >
          Bumalik sa AI chat
        </Link>
      </main>
    </PatientShell>
  );
}
