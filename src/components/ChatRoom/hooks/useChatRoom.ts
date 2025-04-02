import { useSetAtom, useAtomValue } from 'jotai';
import {
  chatRoomsAtom,
  addMessageAtom,
} from '@/components/ChatRoom/store/chatStore';
import { useMessageState } from '@/components/Message/store/useMessageState';
import { useMemo, useRef } from 'react';

export function useChatRoom(roomId?: string, currentUser?: string) {
  const addMessage = useSetAtom(addMessageAtom);
  const rooms = useAtomValue(chatRoomsAtom);
  const { senderName: senderNameReply, messageText: messageTextReply } =
    useMessageState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(
    () => (roomId ? rooms[roomId] || [] : []),
    [roomId, rooms],
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text: string, files?: File[]) => {
    if (!roomId || !currentUser) return;

    addMessage({
      text,
      senderId: currentUser,
      senderName: currentUser,
      roomId,
      replyTo: senderNameReply
        ? { senderName: senderNameReply, text: messageTextReply }
        : null,
      files,
    });
  };

  return {
    messages,
    handleSendMessage,
    messagesEndRef,
    scrollToBottom,
  };
}
