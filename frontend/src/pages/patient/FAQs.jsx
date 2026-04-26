import PatientShell from '../../components/patient/PatientShell.jsx';
import PatientHeader from '../../components/patient/PatientHeader.jsx';
import Icon from '../../components/shared/Icon.jsx';

const faqs = [
  {
    q: 'Paano gumagana ang weAId queue?',
    a: 'Inaayos ng system ang pila base sa urgency ng sintomas at oras ng booking para mas ma-prioritize ang mga kailangang maasikaso agad.',
  },
  {
    q: 'Libre ba ang paggamit ng app?',
    a: 'Oo, libre ang paggamit ng patient app. Ang bayad ay depende pa rin sa serbisyo at ospital na pipiliin ninyo.',
  },
  {
    q: 'Ano ang dapat dalhin sa araw ng appointment?',
    a: 'Magdala ng valid ID, PhilHealth/HMO card kung meron, at listahan ng iniinom na gamot para mas mabilis ang assessment.',
  },
  {
    q: 'Pwede ba akong mag-cancel o mag-reschedule?',
    a: 'Oo. Pumunta sa schedule details at piliin ang rebook o cancel option bago ang takdang oras ng booking.',
  },
  {
    q: 'Paano kung emergency ang sitwasyon?',
    a: 'Gamitin agad ang emergency page ng app o tumawag sa 911. Ang app ay gabay lamang at hindi kapalit ng emergency response.',
  },
];

export default function FAQs() {
  return (
    <PatientShell>
      <PatientHeader
        title="Tulong & FAQs"
        rightAction={<Icon name="help" className="text-white/95" size={20} />}
      />

      <main className="px-container-padding py-stack-md space-y-3 screen-enter">
        {faqs.map((item) => (
          <section key={item.q} className="bg-white rounded-xl p-4 shadow-card border border-outline-variant/20">
            <h3 className="font-bold text-on-surface text-sm flex items-start gap-2">
              <Icon name="help_outline" size={18} className="text-primary-container mt-0.5" />
              <span>{item.q}</span>
            </h3>
            <p className="text-[12px] text-on-surface-variant mt-2 leading-relaxed">{item.a}</p>
          </section>
        ))}
      </main>
    </PatientShell>
  );
}
