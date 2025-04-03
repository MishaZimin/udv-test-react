export type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
};

export type MessageFileProps = {
  file: FileAttachment;
};
