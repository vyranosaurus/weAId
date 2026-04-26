export default function Card({ children, className = '', as = 'div', ...rest }) {
  const Tag = as;
  return (
    <Tag
      className={`bg-white/95 backdrop-blur-[1px] rounded-xl shadow-card border border-outline-variant/20 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
