import { IconType } from 'react-icons';
import { FiImage, FiFile } from 'react-icons/fi';
import { VscSend } from 'react-icons/vsc';
import { VscAttach } from 'react-icons/vsc';
import { GoPlusCircle } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { IoChevronBackOutline } from 'react-icons/io5';

const reactIcons = {
  Attach: VscAttach,
  Send: VscSend,
  Image: FiImage,
  File: FiFile,
  Plus: GoPlusCircle,
  Cross: RxCross2,
  Smile: HiOutlineEmojiHappy,
  Back: IoChevronBackOutline,
};

type IconName = keyof typeof reactIcons;

interface IconButtonProps {
  iconName: IconName;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export const ButtonIcon = ({
  iconName,
  onClick,
  className = '',
  iconClassName = 'opacity-60',
}: IconButtonProps) => {
  const isReactIcon = iconName in reactIcons;
  const ReactIconComponent = reactIcons[
    iconName as keyof typeof reactIcons
  ] as IconType;

  return (
    <div>
      <button
        onClick={onClick}
        className={`transition-all duration-200 min-w-[36px] min-h-[36px] cursor-pointer rounded-[8px] p-[4px] hover:bg-graphite/8 ${className}`}
      >
        {isReactIcon ? (
          <ReactIconComponent
            className={`w-[24px] h-[24px] mx-auto ${iconClassName}`}
          />
        ) : (
          <span className="text-red-500 ">?</span>
        )}
      </button>
    </div>
  );
};
