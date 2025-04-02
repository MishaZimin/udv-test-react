import { memo } from 'react';
import { FaRegFile } from 'react-icons/fa';
import { FileSize } from './FileSize';

type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
};

export const FileError = memo(({ file }: { file: FileAttachment }) => (
  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-700">
    <FaRegFile className="w-5 h-5" />
    <div>
      <p className="truncate">{file.name}</p>
      <p className="text-sm">
        <FileSize bytes={file.size} />
      </p>
    </div>
  </div>
));
