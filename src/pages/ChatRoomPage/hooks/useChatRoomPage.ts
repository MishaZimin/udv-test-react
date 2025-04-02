import { useParams, useNavigate } from 'react-router-dom';

export function useChatRoomPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const currentUser = sessionStorage.getItem('currentUser') || 'Аноним';

  const handleBack = () => navigate('/');

  return {
    roomId,
    currentUser,
    handleBack,
  };
}
