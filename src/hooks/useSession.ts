export const useSession = () => {
  const getSession = () => {
    const session = sessionStorage.getItem("chatSession");
    return session ? JSON.parse(session) : null;
  };

  const setSession = (username: string, room: string) => {
    const sessionData = { username, room };
    sessionStorage.setItem("chatSession", JSON.stringify(sessionData));
  };

  return { getSession, setSession };
};
