
// components/location-button.tsx

"use client";

export function LocationButton({
  address,
  latitude,
  longitude,
}: {
  address: string;
  latitude: number;
  longitude: number;
}) {
  function handleClick() {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const encodedAddress = encodeURIComponent(address);

    const url = isIOS
      ? `https://maps.apple.com/?q=${encodedAddress}&ll=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#b96f73] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(185,111,115,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#aa6064] hover:shadow-[0_14px_30px_rgba(185,111,115,0.25)] active:translate-y-0"
    >
      <MapIcon />

      <span>Ver localização</span>

      <ArrowIcon />
    </button>
  );
}

function MapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
