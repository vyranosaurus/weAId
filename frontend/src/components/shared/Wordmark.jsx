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
      ? '0 1px 0 rgba(255,255,255,0.28), 0 2px 8px rgba(0,0,0,0.32)'
      : '0 1px 0 rgba(255,255,255,0.55), 0 2px 8px rgba(128,0,0,0.25)';
  const resolvedAiTone = aiTone || (tone === 'light' ? 'light' : 'maroon');
  const aiColorClass = resolvedAiTone === 'maroon' ? 'text-primary-container' : 'text-white';
  const aiGlowShadow =
    resolvedAiTone === 'maroon'
      ? '0 0 8px rgba(128,0,0,0.55), 0 0 16px rgba(178,43,29,0.45)'
      : '0 0 8px rgba(255,255,255,0.65), 0 0 14px rgba(255,255,255,0.45)';
  return (
    <span
      className={`font-bold tracking-tight ${sizeMap[size]} ${baseColor} animate-pulse-slow`}
      style={{ textShadow: embossedShadow }}
    >
      We
      <span
        className={`font-ai-signature font-black animate-glow animate-pulse-slow text-[1.22em] leading-none inline-block ${aiColorClass}`}
        style={{ textShadow: aiGlowShadow }}
      >
        AI
      </span>
      d
    </span>
  );
}
