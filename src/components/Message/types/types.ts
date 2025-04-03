export type ActionItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  danger?: boolean;
};

export type ChatFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

export type MessageProps = {
  text: string;
  time: string;
  isMine: boolean;
  senderName: string;
  files?: ChatFile[];
  customActions?: ActionItem[];
  replyTo?: null | { senderName: string | null; text: string | null };
  onAction?: (action: string) => void;
};
