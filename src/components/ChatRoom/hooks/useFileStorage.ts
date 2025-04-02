import { useState, useEffect } from 'react';
import { getBlobUrl } from '@/shared/lib/blobCache';

export function useFileAttachment(fileId: string) {
  const [state, setState] = useState<{
    url: string | null;
    loading: boolean;
    error: boolean;
  }>({
    url: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadFile = async () => {
      try {
        const url = await getBlobUrl(fileId);
        if (isMounted) {
          setState({
            url,
            loading: false,
            error: !url,
          });
        }
      } catch {
        if (isMounted) {
          setState({
            url: null,
            loading: false,
            error: true,
          });
        }
      }
    };

    loadFile();

    return () => {
      isMounted = false;
    };
  }, [fileId]);

  return state;
}
