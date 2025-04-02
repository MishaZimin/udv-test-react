import { memo } from 'react';
import { FaSpinner } from 'react-icons/fa';

export const FileLoading = memo(() => (
  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-700">
    <FaSpinner className="animate-spin w-5 h-5" />
    <span>Загрузка...</span>
  </div>
));
