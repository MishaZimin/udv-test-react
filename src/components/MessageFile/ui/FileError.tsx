import { memo } from 'react';
import { FaRegFile } from 'react-icons/fa';
import { FileSize } from './FileSize';
import { FileAttachment } from '../types/types';

type FileError = { file: FileAttachment };

export const FileError = memo(({ file }: FileError) => (
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
