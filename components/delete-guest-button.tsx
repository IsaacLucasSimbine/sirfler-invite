// components/delete-guest-button.tsx
"use client";

import { useTransition } from "react";
import { deleteGuest } from "@/actions/guest.actions";

export function DeleteGuestButton({
  guestId,
  guestName,
}: {
  guestId: number;
  guestName: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      `Tens a certeza que queres eliminar ${guestName}? Esta ação não pode ser desfeita.`
    );

    if (!confirmed) return;

    startTransition(() => {
      deleteGuest(guestId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 rounded-xl border border-[#e5cecc] bg-white px-3 py-2 text-xs font-medium text-[#a76d6e] transition hover:border-[#d6b3b1] hover:bg-[#faf1f0] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <TrashIcon />
      {isPending ? "A eliminar..." : "Eliminar"}
    </button>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}