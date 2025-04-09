import { useState, useEffect } from 'react';
import { getBlobUrl } from '@/shared/lib/blobCache';

type FileAttachmentState = {
  url: string | null;
  loading: boolean;
  error: boolean;
};

const initialState: FileAttachmentState = {
  url: null,
  loading: true,
  error: false,
};

export function useFileAttachment(fileId: string): FileAttachmentState {
  const [state, setState] = useState<FileAttachmentState>(initialState);

  useEffect(() => {
    let isActive = true;

    const fetchFileUrl = async () => {
      try {
        const url = await getBlobUrl(fileId);

        if (!isActive) return;

        setState({
          url,
          loading: false,
          error: !url,
        });
      } catch {
        if (!isActive) return;

        setState({
          url: null,
          loading: false,
          error: true,
        });
      }
    };

    fetchFileUrl();

    return () => {
      isActive = false;
    };
  }, [fileId]);

  return state;
}
