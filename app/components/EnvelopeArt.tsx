export default function EnvelopeArt({ size = 180 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="92" fill="#EAF7EF" />
      <path
        d="M40 78a8 8 0 0 1 8-8h104a8 8 0 0 1 8 8v58a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V78Z"
        fill="#FFFFFF"
        stroke="#A8B592"
        strokeWidth="2"
      />
      <path d="M42 79 100 122l58-43" stroke="#A8B592" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 142l40-36M158 142l-40-36" stroke="#A8B592" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <path
        d="M100 96c-9-9.5-24-8-27.6 3.8-3.3 10.8 6.6 19.7 27.6 33.7 21-14 30.9-22.9 27.6-33.7C124 88 109 86.5 100 96Z"
        fill="#2ECC71"
      />
      <path d="M64 52c8-4 16-2 20 6M136 52c-8-4-16-2-20 6" stroke="#A8B592" strokeWidth="2" strokeLinecap="round" />
      <circle cx="150" cy="56" r="3" fill="#A8B592" />
      <circle cx="52" cy="126" r="2.4" fill="#A8B592" />
      <circle cx="150" cy="118" r="2" fill="#2ECC71" opacity="0.7" />
    </svg>
  );
}
