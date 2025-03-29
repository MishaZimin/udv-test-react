type MessageProps = {
  text: string;
  time: string;
  isMine: boolean;
};

export const Message = ({ text, time, isMine }: MessageProps) => {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[400px] pr-[50px] min-h-[42px] rounded-xl py-2 pl-4 
          ${isMine ? "bg-mint text-white" : "bg-graphite/6 text-black"}`}
      >
        <p>{text}</p>
        <p
          className={`absolute right-2 bottom-1 text-xs ${isMine ? "text-white" : "text-graphite/80"}`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};
