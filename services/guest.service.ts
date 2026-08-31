// src/services/guest.service.ts
import { randomUUID } from "crypto";
import { GuestRepository } from "@/repositories/guest.repository";

type CreateGuestInput = {
  name: string;
};

export class GuestService {
  private guestRepository: GuestRepository;

  constructor() {
    this.guestRepository = new GuestRepository();
  }

  async createGuest(data: CreateGuestInput) {
    const publicToken = randomUUID();

    const guest = await this.guestRepository.createGuest({
      name: data.name,
      publicToken,
    });

    return guest;
  }

  async getGuestByPublicToken(publicToken: string) {
    const guest = await this.guestRepository.findByPublicToken(publicToken);

    if (!guest) {
      throw new Error("Convidado não encontrado");
    }

    return guest;
  }

  async getGuestById(id: number) {
    const guest = await this.guestRepository.findById(id);

    if (!guest) {
      throw new Error("Convidado não encontrado");
    }

    return guest;
  }

  async updateRsvp(
    publicToken: string,
    rsvpStatus: "PENDING" | "CONFIRMED" | "DECLINED"
  ) {
    const guest = await this.guestRepository.findByPublicToken(publicToken);

    if (!guest) {
      throw new Error("Convidado não encontrado");
    }

    return this.guestRepository.updateRsvpStatus(guest.id, rsvpStatus);
  }

  async listGuests() {
    return this.guestRepository.findAll();
  }

  async removeGuest(id: number) {
  const guest = await this.guestRepository.findById(id);

  if (!guest) {
    throw new Error("Convidado não encontrado");
  }

  return this.guestRepository.deleteGuest(id);
}
}