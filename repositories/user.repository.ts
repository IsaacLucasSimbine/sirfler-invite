// src/repositories/user.repository.ts
import { db } from "@/src/prisma/db";

type CreateUserInput = {
  email: string;
  username?: string;
  name?: string;
  password: string;
};

export class UserRepository {
  async createUser(data: CreateUserInput) {
    const user = await db.orm.public.User.create({
      email: data.email,
      username: data.username,
      name: data.name,
      password: data.password,
    });

    return user;
  }

  async findByEmail(email: string) {
    return db.orm.public.User.where({ email }).first();
  }

  async findByUsername(username: string) {
    return db.orm.public.User.where({ username }).first();  
  }

  async findById(id: number) {
    return db.orm.public.User.where({ id }).first();
  }
}