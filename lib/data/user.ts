import sql from "../db";

export async function updateUserData(newUserData: {
  name: string;
  id: string;
}) {
  await sql`
    UPDATE users
    SET name = ${newUserData.name}
    WHERE id = ${newUserData.id}
  `;
}
