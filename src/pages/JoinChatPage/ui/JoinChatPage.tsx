import { JoinChatForm } from '@/components/JoinChatForm/ui/JoinChatForm';
import { useJoinChat } from '../hooks/useJoinChat';

const JoinChatPage = () => {
  const { handleJoin } = useJoinChat();

  return (
    <div className="flex h-screen">
      <JoinChatForm onJoin={handleJoin} />
    </div>
  );
};

export default JoinChatPage;
