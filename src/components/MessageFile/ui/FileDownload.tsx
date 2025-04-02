import { memo } from 'react';
import { FaRegFile } from 'react-icons/fa';
import { FileSize } from './FileSize';
import { FiDownload } from 'react-icons/fi';

type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
};

export const FileDownload = memo(
  ({ url, file }: { url: string; file: FileAttachment }) => (
    <a
      href={url}
      download={file.name}
      className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
    >
      <div className="flex flex-row gap-3 items-center">
        <FaRegFile className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-sm text-gray-500">
            <FileSize bytes={file.size} />
          </p>
        </div>
        <FiDownload className="w-4 h-4 text-gray-500" />
      </div>
    </a>
  ),
);
