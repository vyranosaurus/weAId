import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';

export default function ConditionForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    symptom: '',
    duration: '',
    severity: 'Katamtaman',
    hasFever: 'Hindi',
    notes: '',
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/patient/recommendation');
  };

  return (
    <PatientShell hideNav>
      <PatientHeader title="Manual na Form" subtitle="Ilagay ang inyong kondisyon" showBack />

      <main className="px-container-padding py-stack-md space-y-3">
        <div className="bg-primary-container/5 border border-primary-container/20 rounded-xl p-3 flex items-start gap-2.5">
          <Icon name="info" className="text-primary-container mt-0.5" size={18} />
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            Mas kumpleto ang detalye, mas mas mabilis ang rekomendasyon ng serbisyo at ospital.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card border border-outline-variant/40 p-4 space-y-3">
          <label className="block space-y-1">
            <span className="text-[12px] font-bold text-on-surface">Pangunahing sintomas</span>
            <input
              value={form.symptom}
              onChange={(e) => handleChange('symptom', e.target.value)}
              required
              placeholder="Hal. Lagnat at ubo"
              className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-primary-container"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-[12px] font-bold text-on-surface">Gaano katagal na?</span>
            <input
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="Hal. 2 araw"
              className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-primary-container"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="block space-y-1">
              <span className="text-[12px] font-bold text-on-surface">Tindi ng nararamdaman</span>
              <select
                value={form.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
                className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-primary-container bg-white"
              >
                <option>Banayad</option>
                <option>Katamtaman</option>
                <option>Malubha</option>
              </select>
            </label>

            <label className="block space-y-1">
              <span className="text-[12px] font-bold text-on-surface">May lagnat ba?</span>
              <select
                value={form.hasFever}
                onChange={(e) => handleChange('hasFever', e.target.value)}
                className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-primary-container bg-white"
              >
                <option>Hindi</option>
                <option>Oo</option>
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-[12px] font-bold text-on-surface">Karagdagang detalye</span>
            <textarea
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={4}
              placeholder="Hal. may hilo tuwing hapon"
              className="w-full border border-outline-variant rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-primary-container resize-none"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-primary-container text-white font-label-bold text-label-bold uppercase py-3 rounded-full shadow-card hover:opacity-95 active:scale-[0.99] transition-all"
          >
            I-submit ang form
          </button>
        </form>
      </main>
    </PatientShell>
  );
}
