import { useState, useRef } from 'react';
import { ButtonIcon } from '@/shared/ui/Buttons/ButtonIcon';
import { useMessageState } from '../../Message/store/useMessageState';
import { useFileUpload } from '../hooks/useFileUpload';
import { FilePreview } from './FilePreview';
import { MessageTextarea } from './MessageTextarea';
import EmojiPicker from 'emoji-picker-react';

export type MessageInputProps = {
  onSend: (text: string, files?: File[]) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const [text, setText] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { files, handleFileChange, removeFile, clearFiles } = useFileUpload();
  const { senderName, messageText, setReplyingMessageInfo } = useMessageState();

  const handleSend = () => {
    if (text.trim() || files.length > 0) {
      console.log(files);
      onSend(text, files);
      setText('');
      clearFiles();
      setReplyingMessageInfo(null, null, null);
    }
  };

  return (
    <div className="flex flex-col border border-graphite/8 rounded-xl p-2 relative">
      {senderName && messageText && (
        <div className="flex gap-2 w-full max-w-full overflow-hidden">
          <div className="flex-shrink-0 bg-mint rounded-full w-1 mt-1" />
          <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-mint truncate">{senderName}</p>
            <p className="truncate">{messageText}</p>
          </div>
          <div className="my-auto">
            <ButtonIcon
              iconName="Cross"
              onClick={() => setReplyingMessageInfo(null, null, null)}
            />
          </div>
        </div>
      )}

      <FilePreview files={files} onRemove={removeFile} />

      <div className="flex items-end relative">
        <ButtonIcon
          iconName="Plus"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />

        <MessageTextarea
          value={text}
          onChange={setText}
          onSend={handleSend}
          placeholder="Напишите сообщение..."
        />

        <ButtonIcon
          iconName="Smile"
          onClick={() => setIsPickerOpen(!isPickerOpen)}
        />
        <ButtonIcon iconName="Send" onClick={handleSend} />

        {isPickerOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-lg z-50">
            <EmojiPicker
              onEmojiClick={(emoji) => setText((prev) => prev + emoji.emoji)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
