import { useMessageState } from '../store/useMessageState';

export const useMessageActionHandlers = (
  messageText: string,
  senderName: string,
) => {
  const { setReplyingMessageInfo } = useMessageState();

  const handleAction = async (action: string) => {
    try {
      switch (action) {
        case 'copy':
          await navigator.clipboard.writeText(messageText);
          break;

        case 'reply':
          if (senderName && messageText) {
            setReplyingMessageInfo(senderName, messageText, '-1');
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const defaultActions = [
    { label: 'Копировать текст', value: 'copy' },
    { label: 'Ответить', value: 'reply' },
  ];

  return { handleAction, defaultActions };
};
