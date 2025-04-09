import { useMessageState } from '@/components/Message/store/useMessageState';

export const useReply = () => {
  const { senderName, messageText, setReplyingMessageInfo } = useMessageState();

  const cancelReply = () => {
    setReplyingMessageInfo(null, null, null);
  };

  return {
    senderName,
    messageText,
    cancel: cancelReply,
  };
};
