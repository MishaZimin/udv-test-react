import { useRef } from 'react';
import { MessageContent } from './MessageContent';
import { MessageTime } from './MessageTime';
import { MessageActionsButton } from './MessageActionsButton';
import { MessageProps } from '../types/Message.types';
import { MessageActions } from './MessageActions';
import { useMenu } from '../hooks/useMenu';
import { MessageSenderName } from './MessageSenderName';

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
        className={`relative max-w-[400px]  min-h-[42px] rounded-xl p-1 ${
          isMine ? 'bg-mint text-white' : 'bg-graphite/6 text-graphite'
        }`}
      >
        {senderName != '' && (
          <MessageSenderName
            isMine={isMine}
            senderName={senderName}
            text={''}
          />
        )}

        {senderName && replyTo?.text && (
          <div className="flex gap-2 w-full max-w-full overflow-hidden mb-1 pl-2 pt-1">
            <div
              className={`flex-shrink-0 ${isMine ? 'bg-white' : 'bg-mint'} rounded-full w-1 mt-1`}
            />
            <div className="flex-1 min-w-0 overflow-hidden">
              <p
                className={`${isMine ? 'text-white' : 'text-mint'} truncate text-sm`}
              >
                {replyTo?.senderName}
              </p>
              <p className="truncate">{replyTo?.text}</p>
            </div>
          </div>
        )}

        {files?.map((file, index) =>
          file.type.startsWith('image/') ? (
            <img
              key={index}
              src={file.url}
              alt={file.name}
              className="max-w-[300px] max-h-[300px] rounded-lg"
            />
          ) : (
            <a
              key={index}
              href={file.url}
              download={file.name}
              className="block p-2 bg-gray-100 rounded-lg mt-2"
            >
              📄 {file.name} ({Math.round(file.size / 1024)} KB)
            </a>
          ),
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
