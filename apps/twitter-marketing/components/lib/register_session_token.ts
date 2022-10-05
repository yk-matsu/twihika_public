import { Session } from "../../universal_lib/session";

export const registerSessionToken: (session: Session) => Promise<Session> = async (
  session
) => {
  await fetch(`/api/session`, {
    method: "POST",
    body: JSON.stringify(session),
    headers: { "content-type": "application/json" },
  });
  return session;
};
export const redirectUntil: (sec: number) => void = async (sec = 2000) => {
  setTimeout(() => {
    window.location.href = "/login";
  }, sec);
};