import { memo, useMemo } from 'react';
import { useFileAttachment } from '@/components/ChatRoom/hooks/useFileStorage';
import { FaRegFile, FaSpinner } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
};

type MessageFileProps = {
  file: FileAttachment;
};

const FileSize = memo(({ bytes }: { bytes: number }) => {
  const sizeText = useMemo(() => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, [bytes]);

  return <span>{sizeText}</span>;
});

const FileLoading = memo(() => (
  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-700">
    <FaSpinner className="animate-spin w-5 h-5" />
    <span>Загрузка...</span>
  </div>
));

const FileError = memo(({ file }: { file: FileAttachment }) => (
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

const ImagePreview = memo(({ url, name }: { url: string; name: string }) => (
  <div className="relative group rounded-lg overflow-hidden mb-5 max-w-[400px]">
    <img
      src={url}
      alt={name}
      className="max-w-full max-h-[400px] object-contain rounded-lg"
      loading="lazy"
      decoding="async"
    />
    <div className="absolute inset-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-start justify-end opacity-0 group-hover:opacity-100">
      <a
        href={url}
        download={name}
        className="p-2 bg-base duration-200 transition-all rounded-md text-gray-800 hover:bg-gray-300 m-2"
        onClick={(e) => e.stopPropagation()}
      >
        <FiDownload size={12} />
      </a>
    </div>
  </div>
));

const FileDownload = memo(
  ({ url, file }: { url: string; file: FileAttachment }) => (
    <a
      href={url}
      download={file.name}
      className="block p-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors mb-5"
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

export const MessageFile = memo(({ file }: MessageFileProps) => {
  const { url: fileUrl, loading, error } = useFileAttachment(file.id);

  if (loading) return <FileLoading />;
  if (error || !fileUrl) return <FileError file={file} />;

  return file.type.startsWith('image/') ? (
    <ImagePreview url={fileUrl} name={file.name} />
  ) : (
    <FileDownload url={fileUrl} file={file} />
  );
});
