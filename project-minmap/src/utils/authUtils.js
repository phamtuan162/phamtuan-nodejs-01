import { getSession } from "next-auth/react";

export async function checkSession(req) {
  const session = await getSession({ req });
  return session;
}
