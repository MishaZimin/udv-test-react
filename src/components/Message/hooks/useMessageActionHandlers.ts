import { useMessageState } from '../store/useMessageState';

export const useMessageActionHandlers = (
  messageText: string,
  senderName: string,
) => {
  const { setReplyingMessageInfo } = useMessageState();

  const handleAction = async (action: string) => {
    switch (action) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(messageText);
        } catch (error) {
          console.error('copy error: ', error);
        }
        break;

      case 'reply':
        if (senderName) {
          setReplyingMessageInfo(
            senderName,
            messageText.trim() === '' ? 'Файл' : messageText,
            '-1',
          );
        }
        break;

      default:
        break;
    }
  };

  const defaultActions = [
    { label: 'Копировать текст', value: 'copy' },
    { label: 'Ответить', value: 'reply' },
  ];

  return { handleAction, defaultActions };
};
