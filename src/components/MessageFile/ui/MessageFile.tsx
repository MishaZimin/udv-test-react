import { useFileAttachment } from '@/components/ChatRoom/hooks/useFileStorage';
import { memo } from 'react';
import { FileLoading } from './FileLoading';
import { FileError } from './FileError';
import { ImagePreview } from './ImagePreview';
import { FileDownload } from './FileDownload';
import { MessageFileProps } from '../types/types';

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
