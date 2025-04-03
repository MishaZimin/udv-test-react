import { forwardRef } from 'react';
import { useMessageActionHandlers } from '../hooks/useMessageActionHandlers';
import { ActionItem } from '../types/types';

type MessageActionsProps = {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  position?: { x: number; y: number };
  actions?: ActionItem[];
  className?: string;
  messageText: string;
  senderName: string;
};

export const MessageActions = forwardRef<HTMLDivElement, MessageActionsProps>(
  (
    {
      isOpen,
      onClose,
      onAction,
      position,
      actions = [],
      className = '',
      messageText,
      senderName,
    },
    ref,
  ) => {
    const { handleAction, defaultActions } = useMessageActionHandlers(
      messageText,
      senderName,
    );

    const mergedActions = actions.length ? actions : defaultActions;

    return (
      <div
        ref={ref}
        className={`p-1 fixed z-50 w-48 bg-white rounded-xl ring-1 ring-gray-200 shadow-lg transition-all duration-200 transform
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 invisible'}
          ${className}`}
        style={{ left: position?.x, top: position?.y }}
      >
        {mergedActions.map(({ label, value }) => (
          <button
            key={value}
            className={` flex items-center w-full px-4 py-2 text-sm text-left rounded-lg transition-colors duration-200 text-graphite hover:bg-graphite/8`}
            onClick={(e) => {
              e.stopPropagation();
              handleAction(value);
              onAction(value);
              onClose();
            }}
          >
            {label}
          </button>
        ))}
      </div>
    );
  },
);
