export default function Wordmark({ size = 'lg', tone = 'light', aiTone }) {
  const sizeMap = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-display-lg',
    xl: 'text-[42px]',
  };
  const baseColor = tone === 'light' ? 'text-white' : 'text-primary-container';
  const embossedShadow =
    tone === 'light'
      ? '0 1px 0 rgba(255,255,255,0.35), 0 3px 12px rgba(0,0,0,0.38)'
      : '0 1px 0 rgba(255,255,255,0.55), 0 2px 8px rgba(128,0,0,0.25)';
  const resolvedAiTone = aiTone || (tone === 'light' ? 'light' : 'maroon');
  const aiColorClass = resolvedAiTone === 'maroon' ? 'text-primary-container' : 'text-white';
  const aiGlowShadow =
    resolvedAiTone === 'maroon'
      ? '0 0 9px rgba(128,0,0,0.58), 0 0 18px rgba(178,43,29,0.48)'
      : '0 0 9px rgba(255,255,255,0.72), 0 0 16px rgba(255,255,255,0.5)';
  return (
    <span
      className={`font-extrabold tracking-[-0.02em] ${sizeMap[size]} ${baseColor} animate-pulse-slow`}
      style={{ textShadow: embossedShadow }}
    >
      We
      <span
        className={`font-ai-signature font-black animate-glow animate-pulse-slow text-[1.22em] leading-none inline-block -mx-[0.01em] ${aiColorClass}`}
        style={{ textShadow: aiGlowShadow }}
      >
        AI
      </span>
      d
    </span>
  );
}
