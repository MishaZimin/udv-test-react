import { memo, useState } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

type ImagePreviewProps = { url: string; name: string };

export const ImagePreview = memo(({ url, name }: ImagePreviewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div
        className="relative group rounded-lg overflow-hidden w-full cursor-zoom-in"
        onClick={toggleFullscreen}
      >
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
            className="p-2 bg-gray-200 duration-100 transition-all rounded-md text-gray-800 hover:bg-gray-300 m-2"
            onClick={(e) => e.stopPropagation()}
          >
            <FiDownload size={12} />
          </a>
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 "
          onClick={toggleFullscreen}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={url}
              alt={name}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute cursor-pointer top-4 right-4 p-2 bg-none rounded-full text-white hover:bg-black transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
            >
              <FiX size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
});
