import { MessageProps } from '../types/types';

export const MessageTime = ({
  time,
  isMine,
}: Pick<MessageProps, 'time' | 'isMine'>) => (
  <p
    className={`absolute right-2 bottom-1 text-xs ${
      isMine ? 'text-white' : 'text-graphite/80'
    }`}
  >
    {time}
  </p>
);
