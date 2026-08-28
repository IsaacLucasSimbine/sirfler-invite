import { db } from "./db";

async function main() {
  const user = await db.orm.public.User.create({
    email: "admin@sirfler.com",
    username: "admin",
    name: "Sirfler Admin",
    password: "admin123",
  });

  console.log("User created:", user);
}

await main();
