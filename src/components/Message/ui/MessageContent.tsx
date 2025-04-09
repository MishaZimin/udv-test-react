type MessageContentProps = {
  text: string;
};

export const MessageContent = ({ text }: MessageContentProps) => (
  <div className="pr-[50px] py-1 pl-2">
    <p className="font-base">{text}</p>
  </div>
);
