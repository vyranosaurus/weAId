import { useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import { CircleIconButton } from '../shared/Buttons.jsx';

export default function PatientHeader({
  title,
  subtitle,
  showBack = true,
  rightAction,
  variant = 'compact',
  children,
  toneOverride,
}) {
  const navigate = useNavigate();

  const isHero = variant === 'hero';
  const bg = toneOverride === 'red' ? 'bg-red-600' : 'bg-primary-container';

  return (
    <header
      className={`sticky top-0 relative ${bg} text-white rounded-b-[20px] shadow-hero header-emboss z-30 ${
        isHero ? 'px-container-padding pt-6 pb-8' : 'px-5 h-16 flex items-center justify-between'
      }`}
    >
      {isHero ? (
        <>
          <div className="flex items-center justify-between mb-4">
            {showBack ? (
              <CircleIconButton
                icon={<Icon name="arrow_back" />}
                tone="white-on-dark"
                onClick={() => navigate(-1)}
              />
            ) : (
              <span />
            )}
            {rightAction}
          </div>
          {title && (
            <h1 className="font-display-md text-display-md text-white tracking-tight">{title}</h1>
          )}
          {subtitle && (
            <p className="font-body-md text-body-md text-white/85 mt-1">{subtitle}</p>
          )}
          {children}
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Bumalik"
              >
                <Icon name="arrow_back" />
              </button>
            )}
            <div>
              {title && <h1 className="font-headline-sm text-headline-sm text-white">{title}</h1>}
              {subtitle && <p className="text-[11px] text-white/80">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">{rightAction}</div>
        </>
      )}
    </header>
  );
}
