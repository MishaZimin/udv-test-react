import { BsThreeDots } from 'react-icons/bs';

type MessageActionsButtonProps = {
  isMine: boolean;
  isHovered: boolean;
  isContextActive: boolean;
  onClick: (e: React.MouseEvent) => void;
};

export const MessageActionsButton = ({
  isMine,
  isHovered,
  isContextActive,
  onClick,
}: MessageActionsButtonProps) => {
  return (
    <div
      className={`
      absolute pb-3 -translate-y-1/2 
      transition-opacity duration-200
      ${isMine ? 'left-[-18px]' : 'right-[-18px]'}
      ${isHovered && !isContextActive ? 'opacity-100' : 'opacity-0'}
    `}
    >
      <button
        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={onClick}
        aria-label="Message actions"
      >
        <BsThreeDots className="w-4 h-4 text-graphite/60 hover:text-graphite/80 transition-colors" />
      </button>
    </div>
  );
};
