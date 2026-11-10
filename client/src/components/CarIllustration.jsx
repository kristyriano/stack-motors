// Simple SVG car so the page needs no external photos.
export default function CarIllustration({ color = '#C9D3DE' }) {
  return (
    <svg viewBox="0 0 240 110" className="car-svg" role="img" aria-label="Car illustration">
      <ellipse cx="120" cy="98" rx="104" ry="7" fill="rgba(15,27,45,.12)" />
      <path d="M14 76c0-12 8-17 20-19l30-5 26-24c6-5 13-8 22-8h40c9 0 16 3 22 9l22 22 18 3c13 2 18 9 18 20v9c0 4-3 6-6 6h-14a20 20 0 0 0-40 0H82a20 20 0 0 0-40 0H20c-4 0-6-2-6-6z" fill={color} />
      <path d="M78 52l20-19c4-3 8-5 13-5h17v24zM140 28h8c6 0 11 2 15 6l18 18h-41z" fill="#0F1B2D" opacity=".85" />
      <circle cx="62" cy="88" r="15" fill="#0F1B2D" /><circle cx="62" cy="88" r="6" fill="#E7EBF0" />
      <circle cx="180" cy="88" r="15" fill="#0F1B2D" /><circle cx="180" cy="88" r="6" fill="#E7EBF0" />
      <rect x="208" y="64" width="12" height="5" rx="2" fill="#F2622E" />
    </svg>
  )
}
