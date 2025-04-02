import { ChatRoom } from '@/components/ChatRoom/ui/ChatRoom';
import { useChatRoomPage } from '../hooks/useChatRoomPage';

const ChatRoomPage = () => {
  const { roomId, currentUser, handleBack } = useChatRoomPage();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <ChatRoom roomId={roomId} currentUser={currentUser} onBack={handleBack} />
    </div>
  );
};

export default ChatRoomPage;
