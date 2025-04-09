import EmojiPicker from 'emoji-picker-react';
import { ButtonIcon } from '@/shared/ui/Buttons/ButtonIcon';
import { FilePreview } from './FilePreview';
import { MessageTextarea } from './MessageTextarea';
import { useTextInput } from '../hooks/useTextInput';
import { useFileUpload } from '../hooks/useFileUpload';
import { useEmojiPicker } from '../hooks/useEmojiPicker';
import { useReply } from '../hooks/useReply';

export type MessageInputProps = {
  onSend: (text: string, files?: File[]) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const textInput = useTextInput();
  const fileUpload = useFileUpload();
  const emojiPicker = useEmojiPicker();
  const reply = useReply();

  const handleSend = () => {
    if (textInput.value.trim() || fileUpload.files.length > 0) {
      onSend(textInput.value, fileUpload.files);
      textInput.clear();
      fileUpload.clearFiles();
      reply.cancel();
      emojiPicker.close();
    }
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    textInput.append(emoji.emoji);
  };

  return (
    <div className="flex flex-col border border-graphite/8 rounded-xl p-2 relative">
      {reply.senderName && reply.messageText && (
        <div className="flex gap-2 w-full max-w-full overflow-hidden mb-2">
          <div className="flex-shrink-0 bg-mint rounded-full w-1 mt-1" />
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-mint truncate">{reply.senderName}</p>
            <p className="truncate">{reply.messageText}</p>
          </div>
          <div className="my-auto">
            <ButtonIcon iconName="Cross" onClick={reply.cancel} />
          </div>
        </div>
      )}

      <FilePreview files={fileUpload.files} onRemove={fileUpload.removeFile} />

      <div className="flex items-end relative">
        <ButtonIcon iconName="Plus" onClick={fileUpload.openFileDialog} />
        <input
          type="file"
          ref={fileUpload.inputRef}
          onChange={fileUpload.handleFileChange}
          className="hidden"
          multiple
        />

        <MessageTextarea
          value={textInput.value}
          onChange={textInput.onChange}
          onSend={handleSend}
          placeholder="Напишите сообщение..."
        />

        <ButtonIcon
          iconName="Smile"
          onClick={emojiPicker.toggle}
          ref={emojiPicker.triggerRef}
        />
        <ButtonIcon iconName="Send" onClick={handleSend} />

        {emojiPicker.isOpen && (
          <div
            ref={emojiPicker.pickerRef}
            className="absolute bottom-full mb-3 right-[-5px] bg-white rounded-xl z-50 shadow-lg"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              width={300}
              height={400}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
