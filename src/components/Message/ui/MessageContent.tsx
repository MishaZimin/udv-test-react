import { MessageProps } from '../types/Message.types';

export const MessageContent = ({
  text,
}: Pick<MessageProps, 'text' | 'isMine' | 'senderName'>) => (
  <div className="pr-[50px] py-1 pl-2">
    <p className="font-base">{text}</p>
  </div>
);
