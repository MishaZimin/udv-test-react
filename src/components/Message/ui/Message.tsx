import { useRef } from 'react';
import { MessageContent } from './MessageContent';
import { MessageTime } from './MessageTime';
import { MessageActionsButton } from './MessageActionsButton';
import { MessageProps } from '../types/types';
import { MessageActions } from './MessageActions';
import { useMenu } from '../hooks/useMenu';
import { MessageSenderName } from './MessageSenderName';
import { MessageReply } from './MessageReply';
import { MessageFile } from '@/components/MessageFile/ui/MessageFile';

export const Message = ({
  text,
  time,
  isMine,
  senderName,
  onAction,
  customActions,
  replyTo,
  files,
}: MessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const {
    isOpen,
    isHovered,
    position,
    openMenu,
    openMenuAtElement,
    closeMenu,
    handleMouseEnter,
    handleMouseLeave,
  } = useMenu(messageRef);
  return (
    <div
      ref={messageRef}
      className={`flex ${isMine ? 'justify-end' : 'justify-start'} py-1 px-1 rounded-2xl relative ${
        isOpen ? 'bg-graphite/4' : ''
      }`}
      onContextMenu={openMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative max-w-[450px] min-h-[42px] rounded-xl p-1 ${
          isMine ? 'bg-mint/90 text-white' : 'bg-graphite/6 text-graphite'
        }`}
      >
        {senderName != '' && (
          <MessageSenderName
            text={''}
            isMine={isMine}
            senderName={senderName}
          />
        )}

        {senderName && replyTo?.text && (
          <MessageReply replyTo={replyTo} isMine={isMine} />
        )}

        {files !== undefined && files?.length > 0 && (
          <div className={`${text ? 'mb-0' : 'mb-5'} flex flex-col gap-1`}>
            {files?.map((file, index) => (
              <MessageFile key={index} file={file} />
            ))}
          </div>
        )}

        {text && (
          <MessageContent text={text} isMine={isMine} senderName={senderName} />
        )}

        <MessageTime time={time} isMine={isMine} />
        <MessageActionsButton
          isMine={isMine}
          isHovered={isHovered}
          isContextActive={isOpen}
          onClick={(e) =>
            openMenuAtElement(e.currentTarget as HTMLElement, isMine)
          }
        />
      </div>

      {isOpen && (
        <MessageActions
          onClose={closeMenu}
          onAction={(action) => onAction?.(action)}
          position={position}
          actions={customActions}
          isOpen={isOpen}
          messageText={text}
          senderName={senderName}
        />
      )}
    </div>
  );
};
