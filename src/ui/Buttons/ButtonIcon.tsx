import DeleteIcon from "@/assets/svgs/Delete.svg";
import EditIcon from "@/assets/svgs/Pencil.svg";
import CrossIcon from "@/assets/svgs/closeLine.svg";
import BackIcon from "@/assets/svgs/BackButton.svg";

const icons = {
  Delete: DeleteIcon,
  Edit: EditIcon,
  Cross: CrossIcon,
  Back: BackIcon,
};

interface IconButtonProps {
  iconName: keyof typeof icons;
  onClick: () => void;
}

export const ButtonIcon = ({ iconName, onClick }: IconButtonProps) => {
  const iconSrc = icons[iconName];

  if (!iconSrc) {
    console.warn(`"${iconName}" не найдена.`);
    return null;
  }

  return (
    <div>
      <button
        onClick={onClick}
        className="animation min-w-[32px] min-h-[32px] cursor-pointer rounded-[8px] p-[4px] hover:bg-graphite/8"
      >
        <img className="w-[24px] mx-auto" src={iconSrc} alt={iconName} />
      </button>
    </div>
  );
};
