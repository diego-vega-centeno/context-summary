import { User } from "@/types/index";
import sql from "../db";
import { UserAuth } from "@/types";

export async function updateUserData(newUserData: {
  name: string;
  id: string;
  staleDays: number;
}) {
  await sql`
    UPDATE users
    SET name = ${newUserData.name}, stale_days = ${newUserData.staleDays}
    WHERE id = ${newUserData.id}
  `;
}

export async function getUser(email: string): Promise<User | undefined> {
  const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
  return user[0];
}

export async function getOauthUser(id: string): Promise<User | undefined> {
  const user = await sql<User[]>`SELECT * FROM users WHERE oauth_id=${id}`;
  return user[0];
}

export async function getUserById(id: string): Promise<UserAuth> {
  const user = await sql<
    UserAuth[]
  >`SELECT id, email, name, stale_days FROM users WHERE id=${id}`;
  return user[0];
}

export async function createUser({
  name,
  email,
  password,
  oauth_id,
  oauth_provider,
}: {
  name: string;
  email?: string;
  password?: string;
  oauth_id?: string;
  oauth_provider?: string;
}) {
  if (oauth_provider && oauth_id && email) {
    await sql`
      INSERT INTO users (name, email, oauth_id, oauth_provider)
      VALUES (${name}, ${email}, ${oauth_id}, ${oauth_provider})
    `;
  } else if (email && password) {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${password})
    `;
  }
}
