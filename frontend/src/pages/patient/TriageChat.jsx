import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import Icon from '../../components/shared/Icon.jsx';
import { triageScript } from '../../data/triage.js';
import { hospitals } from '../../data/hospitals.js';

const questionSteps = triageScript.filter((t) => !t.final);
const closingTurn = triageScript.find((t) => t.final);

export default function TriageChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(() => [
    {
      id: 'q0',
      role: 'assistant',
      text: questionSteps[0]?.bot || 'Kumusta ang kalagayan ninyo?',
    },
  ]);
  const [step, setStep] = useState(0);
  const [qa, setQa] = useState([]);
  const [input, setInput] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const scrollRef = useRef(null);

  const nearestHospitals = hospitals
    .slice()
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 3);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSummaryLoading, summary, step]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/patient/home');
  };

  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

  const submitAnswer = async (answerText) => {
    const text = answerText.trim();
    if (!text || isSummaryLoading || summary) return;

    const currentQuestion = questionSteps[step]?.bot;
    if (!currentQuestion) return;

    const userMessage = { id: `user-${Date.now()}`, role: 'user', text };
    const nextQa = [...qa, { question: currentQuestion, answer: text }];

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setQa(nextQa);

    const nextStep = step + 1;

    if (nextStep < questionSteps.length) {
      setStep(nextStep);
      setMessages((prev) => [
        ...prev,
        {
          id: `q-${nextStep}`,
          role: 'assistant',
          text: questionSteps[nextStep].bot,
        },
      ]);
      return;
    }

    if (closingTurn?.bot) {
      setMessages((prev) => [
        ...prev,
        { id: 'closing', role: 'assistant', text: closingTurn.bot },
      ]);
    }

    setStep(nextStep);
    setIsSummaryLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/triage/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qa: nextQa }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        /* ignore */
      }

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            text: `Hindi makakuha ng AI summary (HTTP ${res.status}). Subukan muli.`,
          },
        ]);
        return;
      }

      setSummary(data);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: `Hindi maka-connect sa AI backend (${e?.message || 'network'}).`,
        },
      ]);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const waitingForAnswer = !summary && !isSummaryLoading && step < questionSteps.length;

  const activeChips = waitingForAnswer ? questionSteps[step]?.chips || [] : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAnswer(input);
    }
  };

  const goToRecommendation = () => {
    if (!summary) return;
    const service = summary.service || summary.recommendedService || 'Serbisyo';
    const rationale = Array.isArray(summary.rationale)
      ? summary.rationale
      : summary.summary
        ? [summary.summary]
        : [];
    navigate('/patient/recommendation', {
      state: {
        recommendation: {
          service,
          urgency: summary.urgency || 'Not specified',
          waitNote: summary.waitNote || '',
          summary: summary.summary || '',
          rationale,
          alternatives: Array.isArray(summary.alternatives) ? summary.alternatives : [],
        },
      },
    });
  };

  return (
    <PatientShell hideNav>
      <div className="min-h-full flex flex-col">
        <header className="bg-primary-container text-white rounded-b-[20px] sticky top-0 z-30 shadow-hero header-emboss h-16 px-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
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
        </header>

        <div className="px-container-padding pt-stack-md">
          <div className="bg-surface-variant text-on-surface-variant text-xs font-bold px-4 py-2 rounded-full shadow-card flex items-center gap-2 max-w-fit mx-auto">
            <Icon name="info" size={16} />
            <span>Hindi po ito doctor. Para sa emergency, tumawag sa 911.</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-stack-md flex-wrap">
          {questionSteps.map((t, i) => {
            const done = i < qa.length;
            const current = i === qa.length && !summary && !isSummaryLoading;
            return (
              <span
                key={t.id}
                className={`w-2 h-2 rounded-full ${
                  done
                    ? 'bg-primary-container'
                    : current
                      ? 'bg-primary-container ring-2 ring-primary-container/35 scale-110'
                      : 'bg-outline-variant'
                }`}
              />
            );
          })}
          <span className="ml-2 text-xs text-on-surface-variant">
            {isSummaryLoading
              ? 'Pinoproseso ang resulta…'
              : summary
                ? 'Tapos na ang mga tanong'
                : `Tanong ${Math.min(qa.length + 1, questionSteps.length)} ng ${questionSteps.length}`}
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-container-padding pb-32 flex flex-col gap-stack-md"
        >
          {messages.map((m, idx) => (
            <div
              key={m.id}
              className="space-y-3 chat-turn-enter"
              style={{ '--chat-turn-delay': `${idx * 40}ms` }}
            >
              {m.role === 'user' && (
                <div className="flex justify-end">
                  <div
                    className="bg-primary-container text-white text-body-md px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-hero chat-bubble-enter"
                    style={{ '--chat-bubble-delay': `${idx * 40 + 30}ms` }}
                  >
                    {m.text}
                  </div>
                </div>
              )}
              {m.role === 'assistant' && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[90%]">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Icon name="smart_toy" className="text-white" size={18} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div
                        className="bg-white text-on-surface text-body-md px-4 py-3 rounded-2xl rounded-tl-sm shadow-card chat-bubble-enter"
                        style={{ '--chat-bubble-delay': `${idx * 40 + 60}ms` }}
                      >
                        {m.text}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {waitingForAnswer && activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pl-10">
              {activeChips.map((c, chipIdx) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => submitAnswer(c)}
                  className="bg-white border border-outline-variant text-primary-container text-body-md px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all hover:border-primary-container chat-chip-pop"
                  style={{ '--chat-chip-delay': `${chipIdx * 70 + 80}ms` }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {isSummaryLoading && (
            <div className="flex items-center gap-2 text-on-surface-variant pl-10">
              <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse" />
              <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse delay-100" />
              <span className="w-2 h-2 bg-primary-container rounded-full animate-pulse delay-200" />
              <span className="text-xs">Gumagawa ang AI ng buod at rekomendasyon…</span>
            </div>
          )}

          {summary && (
            <div className="space-y-3 pl-2">
              <div className="bg-white border border-primary-container/25 rounded-xl p-3 shadow-card space-y-2">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-primary-container">
                  AI buod at rekomendasyon
                </p>
                <p className="text-[12px] text-on-surface">
                  Inirerekomendang serbisyo:{' '}
                  <span className="font-bold">{summary.service || summary.recommendedService}</span>
                </p>
                <p className="text-[11px] text-on-surface-variant">
                  Kalubhaan: <span className="font-bold text-on-surface">{summary.urgency}</span>
                  {summary.waitNote ? ` · ${summary.waitNote}` : ''}
                </p>
                {summary.summary && (
                  <p className="text-[12px] text-on-surface leading-snug">{summary.summary}</p>
                )}
                {Array.isArray(summary.rationale) && summary.rationale.length > 0 && (
                  <ul className="text-[11px] text-on-surface-variant list-disc pl-4 space-y-1">
                    {summary.rationale.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-on-surface">Malalapit na ospital (halimbawa):</p>
                  {nearestHospitals.map((h) => (
                    <div key={h.id} className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      <Icon name="local_hospital" size={13} className="text-primary-container" />
                      {h.name} · {h.distanceKm} km
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
                  Babala: AI gabay lamang ito at hindi kapalit ng doktor.
                </p>
                <button
                  type="button"
                  onClick={goToRecommendation}
                  className="w-full bg-primary-container text-white text-xs font-bold uppercase py-2 rounded-full"
                >
                  Buksan ang detalyadong rekomendasyon
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/patient/results')}
                  className="w-full border border-outline-variant text-primary-container text-xs font-bold uppercase py-2 rounded-full"
                >
                  Hanapin ang ospital
                </button>
              </div>
            </div>
          )}
        </div>

        {!summary && (
          <div className="sticky mt-auto bottom-5 w-full bg-white border-t border-outline-variant/40 p-4 pb-safe z-40 shadow-nav-top">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full"
                aria-label="Attachment"
              >
                <Icon name="add_circle" />
              </button>
              <div className="flex-1 relative">
                <input
                  className="w-full bg-[#F5F5F5] border border-outline-variant rounded-xl px-4 py-3 pr-10 text-body-md focus:outline-none focus:border-primary-container"
                  placeholder={
                    waitingForAnswer
                      ? questionSteps[step]?.placeholder || 'I-type ang sagot…'
                      : 'Sandali…'
                  }
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!waitingForAnswer || isSummaryLoading}
                />
                <button
                  type="button"
                  onClick={() => submitAnswer(input)}
                  disabled={!waitingForAnswer || isSummaryLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary-container hover:bg-surface-variant rounded-full disabled:opacity-40"
                >
                  <Icon name="send" />
                </button>
              </div>
              <button
                type="button"
                className="w-12 h-12 bg-primary-container text-white rounded-full flex items-center justify-center shadow-card active:scale-95"
                aria-label="Voice"
              >
                <Icon name="mic" filled />
              </button>
            </div>
          </div>
        )}
      </div>
    </PatientShell>
  );
}
