import { useFileUpload } from './useFileUpload';
import { useReply } from './useReply';
import { useTextInput } from './useTextInput';

export const useMessageSender = (
  onSend: (text: string, files?: File[]) => void,
) => {
  const textInput = useTextInput();
  const fileUpload = useFileUpload();
  const reply = useReply();

  const sendMessage = () => {
    if (textInput.value.trim() || fileUpload.files.length > 0) {
      onSend(textInput.value, fileUpload.files);
      textInput.clear();
      fileUpload.clearFiles();
      reply.cancel();
    }
  };

  return {
    send: sendMessage,
  };
};
