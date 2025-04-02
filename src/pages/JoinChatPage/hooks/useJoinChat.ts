import { useNavigate } from 'react-router-dom';

export function useJoinChat() {
  const navigate = useNavigate();

  const handleJoin = (name: string, room: string) => {
    const roomId = room.toLowerCase().replace(/\s+/g, '-');
    sessionStorage.setItem('currentUser', name);
    navigate(`/chat/${roomId}`);
  };

  return {
    handleJoin,
  };
}
