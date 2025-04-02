type FilePreview = {
  id: string;
  type: string;
  name: string;
};

type Reply = {
  senderName: string | null;
  text: string | null;
  files?: FilePreview[];
} | null;

type MessageReplyProps = {
  replyTo: Reply;
  isMine: boolean;
};

export const MessageReply = ({ replyTo, isMine }: MessageReplyProps) => (
  <div className="flex gap-2 w-full max-w-full overflow-hidden mb-1 pl-2 pt-1 pr-1 ">
    <div
      className={`flex-shrink-0 ${isMine ? 'bg-white' : 'bg-mint'} rounded-full w-1 mt-1`}
    />
    <div className="flex-1 min-w-0 overflow-hidden">
      <p className={`${isMine ? 'text-white' : 'text-mint'} truncate text-sm`}>
        {replyTo?.senderName}
      </p>
      <p className="truncate">{replyTo?.text}</p>
    </div>
  </div>
);
