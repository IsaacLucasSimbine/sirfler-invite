// src/repositories/guest.repository.ts
import { db } from "@/src/prisma/db";

type CreateGuestInput = {
  name: string;
  publicToken: string;
};

export class GuestRepository {
  async createGuest(data: CreateGuestInput) {
    const guest = await db.orm.public.Guest.create({
      name: data.name,
      publicToken: data.publicToken,
    });

    return guest;
  }

  async findByPublicToken(publicToken: string) {
    return db.orm.public.Guest.where({ publicToken }).first();
  }

  async findById(id: number) {
    return db.orm.public.Guest.where({ id }).first();
  }

  async updateRsvpStatus(
    id: number,
    rsvpStatus: "PENDING" | "CONFIRMED" | "DECLINED"
  ) {
    return db.orm.public.Guest.where({ id }).update({
      rsvpStatus,
      respondedAt: Temporal.Now.instant(),
    });
  }

  async findAll() {
    return db.orm.public.Guest.all();
  }

    async deleteGuest(id: number) {
    return db.orm.public.Guest.where({ id }).delete();
  }
}