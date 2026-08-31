// src/actions/guest.actions.ts
"use server";

import { GuestService } from "@/services/guest.service";
import { revalidatePath } from "next/cache";

type GuestFormState =
  | {
      error?: {
        name?: string;
      };
      message?: string;
    }
  | undefined;

export async function createGuest(state: GuestFormState, formData: FormData) {
  const name = formData.get("name") as string;

  if (!name || name.trim().length < 2) {
    return {
      error: {
        name: "O nome deve ter pelo menos 2 caracteres",
      },
    };
  }

  const guestService = new GuestService();

  try {
    await guestService.createGuest({ name });
    revalidatePath("/guests");
    return { message: "Convidado criado com sucesso" };
  } catch (error) {
    return { message: (error as Error).message };
  }
}

type RsvpFormState =
  | {
      message?: string;
    }
  | undefined;

export async function updateRsvp(
  publicToken: string,
  state: RsvpFormState,
  formData: FormData
) {
  const rsvpStatus = formData.get("rsvpStatus") as
    | "CONFIRMED"
    | "DECLINED";

  if (rsvpStatus !== "CONFIRMED" && rsvpStatus !== "DECLINED") {
    return { message: "Resposta inválida" };
  }

  const guestService = new GuestService();

  try {
    await guestService.updateRsvp(publicToken, rsvpStatus);
    return { message: "Resposta registada com sucesso" };
  } catch (error) {
    return { message: (error as Error).message };
  }
}

export async function submitRsvp(
  publicToken: string,
  formData: FormData
) {
  const rsvpStatus = formData.get("rsvpStatus") as
    | "PENDING"
    | "CONFIRMED"
    | "DECLINED";

  if (
    rsvpStatus !== "PENDING" &&
    rsvpStatus !== "CONFIRMED" &&
    rsvpStatus !== "DECLINED"
  ) {
    return;
  }

  const guestService = new GuestService();

  try {
    await guestService.updateRsvp(publicToken, rsvpStatus);
  } catch {
    // silencioso por agora
  }

  revalidatePath(`/convite/${publicToken}`);
}

export async function deleteGuest(id: number) {
  const guestService = new GuestService();

  try {
    await guestService.removeGuest(id);
  } catch {
    // silencioso por agora
  }

  revalidatePath("/dashboard");
}

