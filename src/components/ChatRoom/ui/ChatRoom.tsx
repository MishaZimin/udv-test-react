import { useEffect } from 'react';
import { Message } from '@/components/Message/ui/Message';
import { ButtonIcon } from '@/shared/ui/Buttons/ButtonIcon';
import { MessageInput } from '@/components/ChatInput/ui/MessageInput';
import { useChatMessages } from '../hooks/useChatMessages';
import { useChatRoom } from '../hooks/useChatRoom';

type ChatRoomProps = {
  roomId?: string;
  currentUser: string;
  onBack: () => void;
};

export const ChatRoom = ({ roomId, currentUser, onBack }: ChatRoomProps) => {
  const { messages, handleSendMessage, messagesEndRef, scrollToBottom } =
    useChatRoom(roomId, currentUser);
  const ChatMessages = useChatMessages(messages);

  useEffect(() => {
    scrollToBottom();
  }, [ChatMessages, scrollToBottom]);

  return (
    <div className="w-full max-w-[724px] flex flex-col h-full border border-graphite/8 rounded-2xl my-8 overflow-hidden scrollbar-thin">
      <div className="p-2 border-b bg-white/30 border-graphite/8 backdrop-blur-sm flex justify-between items-center">
        <ButtonIcon iconName="Back" onClick={onBack} />
        <h2 className="font-medium">Комната {roomId}</h2>
        <p className="text-sm min-w-8 text-center">{currentUser}</p>
      </div>

      <div className="relative flex-1 overflow-y-auto px-6 pt-4 pb-12">
        {ChatMessages.map((msg) => (
          <Message
            key={msg.id}
            text={msg.text}
            time={msg.time}
            isMine={msg.senderId === currentUser}
            senderName={msg.senderName}
            replyTo={msg.replyTo}
            files={msg.files}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mx-4 pb-4 ">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};
