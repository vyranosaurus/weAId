export default function KpiCard({ label, value, delta, deltaTone = 'emerald', children }) {
  const tones = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border-t border-outline-variant/20 flex flex-col justify-between min-h-[120px]">
      <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase mb-3">
        {label}
      </h3>
      <div className="flex items-end justify-between">
        <span className="font-display-lg text-display-lg text-primary-container">{value}</span>
        {children ||
          (delta && (
            <span
              className={`font-label-bold text-[10px] px-2 py-1 rounded-full ${tones[deltaTone]}`}
            >
              {delta}
            </span>
          ))}
      </div>
    </div>
  );
}
