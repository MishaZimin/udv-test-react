import { memo, useMemo } from 'react';

type FileSizeProps = { bytes: number };

export const FileSize = memo(({ bytes }: FileSizeProps) => {
  const sizeText = useMemo(() => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, [bytes]);

  return <span>{sizeText}</span>;
});
