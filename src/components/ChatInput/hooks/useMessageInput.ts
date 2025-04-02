import { useRef, useState } from 'react';
import { useFileUpload } from './useFileUpload';
import { useMessageState } from '@/components/Message/store/useMessageState';
import { usePickerCloseEffect } from './usePickerCloseEffect';

export const useMessageInput = (
  onSend: (text: string, files?: File[]) => void,
) => {
  const [text, setText] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const fileActions = useFileUpload();

  const { senderName, messageText, setReplyingMessageInfo } = useMessageState();

  usePickerCloseEffect(isPickerOpen, pickerRef, setIsPickerOpen);

  return {
    textState: {
      value: text,
      onChange: setText,
    },
    emojiPicker: {
      isOpen: isPickerOpen,
      toggle: () => setIsPickerOpen(!isPickerOpen),
      ref: pickerRef,
      onEmojiSelect: (emoji: { emoji: string }) =>
        setText((prev) => prev + emoji.emoji),
    },
    fileInput: {
      ref: fileInputRef,
      onChange: fileActions.handleFileChange,
      open: () => fileInputRef.current?.click(),
    },
    files: {
      list: fileActions.files,
      remove: fileActions.removeFile,
    },
    reply: {
      senderName,
      messageText,
      cancel: () => setReplyingMessageInfo(null, null, null),
    },
    send: {
      handle: () => {
        if (text.trim() || fileActions.files.length > 0) {
          onSend(text, fileActions.files);
          setText('');
          fileActions.clearFiles();
          setReplyingMessageInfo(null, null, null);
          setIsPickerOpen(false);
        }
      },
    },
  };
};
