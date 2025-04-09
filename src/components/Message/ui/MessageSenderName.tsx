import { MessageProps } from '../types/types';

export const MessageSenderName = ({
  isMine,
  senderName,
}: Pick<MessageProps, 'isMine' | 'senderName'>) => (
  <div className="pr-[50px] pl-2">
    {!isMine && <p className=" text-mint ">{senderName}</p>}
  </div>
);
