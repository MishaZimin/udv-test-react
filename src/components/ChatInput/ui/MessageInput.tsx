import { ButtonIcon } from '@/shared/ui/Buttons/ButtonIcon';
import { FilePreview } from './FilePreview';
import { MessageTextarea } from './MessageTextarea';
import EmojiPicker from 'emoji-picker-react';
import { useMessageInput } from '../hooks/useMessageInput';

export type MessageInputProps = {
  onSend: (text: string, files?: File[]) => void;
};

export const MessageInput = ({ onSend }: MessageInputProps) => {
  const { textState, emojiPicker, fileInput, files, reply, send } =
    useMessageInput(onSend);

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

      <FilePreview files={files.list} onRemove={files.remove} />

      <div className="flex items-end relative">
        <ButtonIcon iconName="Plus" onClick={fileInput.open} />
        <input
          type="file"
          ref={fileInput.ref}
          onChange={fileInput.onChange}
          className="hidden"
          multiple
        />

        <MessageTextarea
          value={textState.value}
          onChange={textState.onChange}
          onSend={send.handle}
          placeholder="Напишите сообщение..."
        />

        <ButtonIcon iconName="Smile" onClick={emojiPicker.toggle} />
        <ButtonIcon iconName="Send" onClick={send.handle} />

        {emojiPicker.isOpen && (
          <div
            ref={emojiPicker.ref}
            className="absolute bottom-full mb-3 right-[-5px] bg-white rounded-xl z-50 shadow-lg"
          >
            <EmojiPicker
              onEmojiClick={emojiPicker.onEmojiSelect}
              width={400}
              height={500}
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
