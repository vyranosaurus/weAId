export default function Icon({ name, className = '', filled = false, size }) {
  const sizeStyle = size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : {};
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'icon-fill' : ''} ${className}`}
      style={sizeStyle}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
