import { FiX } from 'react-icons/fi';

type FilePreviewProps = {
  files: File[];
  onRemove: (index: number) => void;
};

export const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  if (files.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {files.map((file, index) => (
        <div
          key={index}
          className="relative bg-graphite/6 rounded-lg p-2 text-sm flex items-center"
        >
          <span className="truncate max-w-[120px] text-graphite/80">
            {file.name}
          </span>
          <button
            onClick={() => onRemove(index)}
            className="ml-2 text-gray-500 hover:bg-graphite/8 rounded-full p-1"
          >
            <FiX size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
