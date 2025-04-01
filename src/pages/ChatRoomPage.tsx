import { useSetAtom, useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { Message } from '@/components/Message/ui/Message';

import { useEffect, useRef, useMemo } from 'react';
import { ButtonIcon } from '@/shared/ui/Buttons/ButtonIcon';
import { useNavigate } from 'react-router-dom';
import { chatRoomsAtom, addMessageAtom } from '@/shared/store/chatStore';
import { useMessageState } from '@/components/Message/store/useMessageState';
import { MessageInput } from '@/components/ChatInput/ui/MessageInput';

export const ChatRoom = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const addMessage = useSetAtom(addMessageAtom);
  const rooms = useAtomValue(chatRoomsAtom);
  const currentUser = sessionStorage.getItem('currentUser') || 'Аноним';
  const { senderName: senderNameReply, messageText: messageTextReply } =
    useMessageState();

  const messages = useMemo(
    () => (roomId ? rooms[roomId] || [] : []),
    [roomId, rooms],
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string, files?: File[]) => {
    if (!roomId) return;

    const preparedFiles = files?.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    }));

    if (text.trim() || preparedFiles?.length) {
      addMessage({
        text,
        senderId: currentUser,
        senderName: currentUser,
        roomId,
        replyTo: senderNameReply
          ? {
              senderName: senderNameReply,
              text: messageTextReply,
            }
          : null,
        files: preparedFiles || [],
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-[724px] flex flex-col h-full border border-graphite/8 rounded-2xl my-8 overflow-hidden scrollbar-thin">
        <div className="p-4 border-b bg-white/30 border-graphite/8 backdrop-blur-sm flex justify-between items-center">
          <ButtonIcon iconName="Back" onClick={() => navigate('/')} />
          <h2 className="font-medium">Комната {roomId}</h2>
          <p className="text-sm min-w-8 text-center">{currentUser}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-12">
          {messages.map((msg) => (
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

        <div className="mx-4 pb-4">
          <MessageInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};
