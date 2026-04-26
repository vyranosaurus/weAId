import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { triageScript } from '../../data/triage.js';

export default function TriageChat() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [step]);

  const turns = triageScript.slice(0, step);
  const current = triageScript[step - 1];
  const isFinal = current?.final;

  const handleAnswer = () => {
    if (step < triageScript.length) {
      setStep(step + 1);
    } else {
      navigate('/patient/recommendation');
    }
  };

  return (
    <PatientShell hideNav>
      {/* Header */}
      <header className="bg-primary-container text-white rounded-b-[20px] sticky top-0 z-30 shadow-hero h-16 px-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-white/10"
          >
            <Icon name="arrow_back" />
          </button>
          <div className="flex items-center gap-2">
            <Icon name="smart_toy" filled />
            <span className="font-bold">
              weAId{' '}
              <span className="font-ai-signature font-black ai-glow-light">AI Assistant</span>
            </span>
          </div>
        </div>
        <button className="p-2 -mr-2 rounded-full hover:bg-white/10">
          <Icon name="more_vert" />
        </button>
      </header>

      {/* Disclaimer */}
      <div className="px-container-padding pt-stack-md">
        <div className="bg-surface-variant text-on-surface-variant text-xs font-bold px-4 py-2 rounded-full shadow-card flex items-center gap-2 max-w-fit mx-auto">
          <Icon name="info" size={16} />
          <span>Hindi po ito doctor. Para sa emergency, tumawag sa 911.</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 py-stack-md">
        {triageScript.map((t, i) => (
          <span
            key={t.id}
            className={`w-2 h-2 rounded-full ${i < step ? 'bg-primary-container' : 'bg-outline-variant'}`}
          />
        ))}
        <span className="ml-2 text-xs text-on-surface-variant">
          Tanong {step} ng {triageScript.length}
        </span>
      </div>

      {/* Chat */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-container-padding pb-32 flex flex-col gap-stack-md"
      >
        {turns.map((t, idx) => (
          <div key={t.id} className="space-y-3">
            {t.user && (
              <div className="flex justify-end">
                <div className="bg-primary-container text-white text-body-md px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-hero">
                  {t.user}
                </div>
              </div>
            )}
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Icon name="smart_toy" className="text-white" size={18} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-white text-on-surface text-body-md px-4 py-3 rounded-2xl rounded-tl-sm shadow-card">
                    {t.bot}
                  </div>
                  {idx === turns.length - 1 && t.chips?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {t.chips.map((c) => (
                        <button
                          key={c}
                          onClick={handleAnswer}
                          className="bg-white border border-outline-variant text-primary-container text-body-md px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all hover:border-primary-container"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                  {idx === turns.length - 1 && isFinal && (
                    <div className="flex items-center gap-2 mt-1 text-on-surface-variant">
                      <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse delay-100" />
                      <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse delay-200" />
                      <span className="text-xs">Hinahanap ang tamang serbisyo…</span>
                      <button
                        onClick={() => navigate('/patient/recommendation')}
                        className="ml-2 text-xs text-primary-container font-bold underline"
                      >
                        Ipakita
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-outline-variant/40 p-4 pb-safe z-40 shadow-nav-top">
        <div className="flex items-center gap-3">
          <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full">
            <Icon name="add_circle" />
          </button>
          <div className="flex-1 relative">
            <input
              className="w-full bg-[#F5F5F5] border border-outline-variant rounded-xl px-4 py-3 pr-10 text-body-md focus:outline-none focus:border-primary-container"
              placeholder="Mag-type ng inyong nararamdaman…"
              type="text"
            />
            <button
              onClick={handleAnswer}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary-container hover:bg-surface-variant rounded-full"
            >
              <Icon name="send" />
            </button>
          </div>
          <button className="w-12 h-12 bg-primary-container text-white rounded-full flex items-center justify-center shadow-card active:scale-95">
            <Icon name="mic" filled />
          </button>
        </div>
      </div>
    </PatientShell>
  );
}
