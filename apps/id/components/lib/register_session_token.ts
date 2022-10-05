import { Session } from "../../universal_lib/session";

export const registerSessionToken: (session: Session, ref: string) => Promise<Session & {ref: string}> = async (
  session,
  ref
) => {
  const result = await fetch(`/api/session?ref=${ref}`, {
    method: "POST",
    body: JSON.stringify({...session,ref}),
    headers: { "content-type": "application/json" },
  });

  return {...session, ...await result.json()};
};
export const redirectUntil: (sec: number, ref: string) => void = async (sec = 2000, ref: string) => {
  setTimeout(() => {
    window.location.href = ref || "/login";
  }, sec);
};